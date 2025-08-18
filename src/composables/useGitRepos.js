import { ref } from 'vue';

export function useGitRepos(){
    const name = ref();
    const desc= ref();
    const repos = ref([]);
    const fetchRepos = async()=>{
        const username = process.env.VUE_APP_GITHUB_USERNAME
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        repos.value = await response.json();

        console.log("Repos: ", repos.value == null ? "No repos found" : JSON.parse(JSON.stringify(repos.value)));
    }
    return { name, desc, repos, fetchRepos };
}