import { ref } from 'vue';

export function useGitRepos() {
  const repos = ref([]);

  const fetchRepos = async () => {
    const username = process.env.VUE_APP_GITHUB_USERNAME;

    try {
      // 1) загружаем og-map.json
      const ogRes = await fetch('/og-map.json');
      const ogMap = await ogRes.json();
      console.log("OG Map keys:", Object.keys(ogMap).length);

      // 2) загружаем список репозиториев через REST API
      const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const reposJson = await response.json();
      console.log("Repos fetched:", reposJson.length);

      // 3) объединяем данные
      repos.value = reposJson.map(r => {
        const key = r.full_name; // формат "owner/name"
        return {
          ...r,
          socialPreview: ogMap[key] || null
        };
      });
    } catch (err) {
      console.error("Ошибка в fetchRepos:", err);
    }
  };

  return { repos, fetchRepos };
}
