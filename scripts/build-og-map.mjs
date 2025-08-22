import fs from "node:fs/promises";

const username = "xobivan"; // ← твой логин

// Собираем ВСЕ публичные репозитории пользователя (с пагинацией)
async function fetchAllPublicRepos(user) {
  const all = [];
  let page = 1;
  while (true) {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&page=${page}`,
      { headers: { Authorization: `bearer ${process.env.GITHUB_TOKEN}` } } // чтобы не упереться в лимит
    );
    if (!res.ok) throw new Error(`Failed repos page ${page}: ${res.status} ${await res.text()}`);
    const batch = await res.json();
    console.log(`Page ${page}: ${batch.length} repos`);
    all.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return all;
}

const repos = await fetchAllPublicRepos(username);
console.log("Total public repos fetched:", repos.length);

const query = `
  query($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) { openGraphImageUrl }
  }
`;

const headers = {
  "Content-Type": "application/json",
  "Authorization": `bearer ${process.env.GITHUB_TOKEN}`
};

const out = {};
for (const repo of repos) {
  const owner = repo.owner.login;   // на всякий случай берём из ответа
  const name  = repo.name;
  const full  = `${owner}/${name}`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables: { owner, name } })
  });

  if (!res.ok) {
    console.error(`❌ ${full}:`, res.status, await res.text());
    continue;
  }

  const json = await res.json();
  const url = json?.data?.repository?.openGraphImageUrl || null;
  if (url) {
    out[full] = url;
    console.log(`✅ ${full}`);
  } else {
    console.log(`⚠️  ${full} returned no OG url`);
  }
}

// Отсортируем ключи (удобнее глазами)
const sorted = Object.fromEntrsies(Object.entries(out).sort());

await fs.mkdir("public", { recursive: true });
await fs.writeFile("public/og-map.json", JSON.stringify(sorted, null, 2));

console.log("✨ Wrote public/og-map.json with", Object.keys(sorted).length, "entries");
