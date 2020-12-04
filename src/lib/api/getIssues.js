import * as appHelpers from '../../utils/appHelpers';

function getIssues(state) {
    const headers = {
        headers: {
            Authorization: "token 60e07ff280c786e523a632be9af8f992270a5c5b",
            Accept: "application/vnd.github.v3+json,application/vnd.github.machine-man-preview+json",
        }
    };

    const baseUrl = "https://api.github.com/repos"

    const params = appHelpers.encodeQueryString({ state: state.listFilter.state, per_page: 40, sort: "created" })
    let repoOfUser = `${state.user}/${state.repo}/issues`
    let fullUrl = `${baseUrl}/${repoOfUser}${params}${state.page}`
    return fetch(fullUrl, headers)
           .then(response => {
           if (response.ok) return response.json();
          throw new Error('Request failed.');
        })
  };

  export default getIssues
