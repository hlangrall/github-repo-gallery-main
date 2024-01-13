// div where profile information will appear
const overview = document.querySelector(".overview");
// github username
const username = "hlangrall";
// unordered list to display the repos list
const repoList = document.querySelector(".repo-list");

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
    `https://api.github.com/users/${username}/repos?sort=updated-asc&per_page=100`
  );
  const repoData = await request.json();
  //console.log(repoData);

  repoDisplay(repoData);
};
//getRepos();

const repoDisplay = function (repos) {
  for (const repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
};
