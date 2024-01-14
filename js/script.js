// div where profile information will appear
const overview = document.querySelector(".overview");
// github username
const username = "hlangrall";
// unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
// section where all repo info appears
const repos = document.querySelector(".repos");
// section where individual repo data appears
const repoDataSection = document.querySelector(".repo-data");
// back to repo button
const backButton = document.querySelector(".view-repos");
// input with the "search by name" placeholder
const filterInput = document.querySelector(".filter-repos");

const getData = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  //console.log(data);
  display(data);
};
getData();

const display = function (data) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("user-info");
  newDiv.innerHTML = `
  <figure>
      <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>
  `;
  overview.append(newDiv);

  getRepos();
};

const getRepos = async function () {
  const request = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoData = await request.json();
  //console.log(repoData);

  repoDisplay(repoData);
};
//getRepos();

const repoDisplay = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    let repoName = e.target.innerText;
    repoSpec(repoName);
  }
});

const repoSpec = async function (repoName) {
  const requestInfo = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await requestInfo.json();
  console.log(repoInfo);

  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  //console.log(languageData);

  const languages = [];

  for (const language in languageData) {
    languages.push(language);
    console.log(languages);
  }
  repoSpecDisplay(repoInfo, languages);
};

const repoSpecDisplay = function (repoInfo, languages) {
  repoDataSection.innerHTML = "";
  repoDataSection.classList.remove("hide");
  repos.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${
      repoInfo.html_url
    }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoDataSection.append(div);

  backButton.classList.remove("hide");
};

backButton.addEventListener("click", function () {
  repos.classList.remove("hide");
  repoDataSection.classList.add("hide");
  backButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
  const inputValue = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const toLower = inputValue.toLowerCase();

  for (const repo of repos) {
    const lowerRepo = repo.innerText.toLowerCase();
    if (lowerRepo.includes(toLower)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});
