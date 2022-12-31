const container = document.querySelector(".container");
const charactersList = document.querySelector("#charactersList");
const header = document.querySelector("#header");
let count = document.querySelector(".count");
const searchBar = document.querySelector(".searchBar");
let hpCharacters = [];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.summary.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});


const loadCharacters = async () => {
  try {
    const res = await fetch("https://api.tvmaze.com/shows/5/episodes");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
    selectCharacters(hpCharacters);
  } catch (err) {
    console.error(err);
  }
};
const select = document.createElement("select");
function selectCharacters() {
  for (website1 of hpCharacters) {
    select.classList.add("select");
    const option = document.createElement("option");
    option.innerHTML = `S0${website1.season}E0${website1.number} - ${website1.name}`;
    option.classList = "option";
    select.appendChild(option);
  }
}
header.appendChild(select);
select.addEventListener("change", () => {
  const option = document.getElementsByClassName("option");
  const box = document.getElementsByClassName("character");
  let selects1 = select.options[select.selectedIndex].value
  //console.log(selects1);
  for (let i = 0; i < select.length; i++) {
    if (option[i].value === selects1) {
      box[i].style.display = "block";
    } else {
      box[i].style.display = "none";
    }
  }
});
const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
            <div class="character">
            <img class="imgOfTv" src="${character.image.medium}"></img>
                <h3 class="nameOfTv">${character.name} S0${character.season}E0${character.number}</h3>
                <span class="summaryOfTv"> ${character.summary}</span>
            </div>
        `;
    })
    .join("");
  count.innerHTML = `${characters.length} found of this word from ${hpCharacters.length}Move`;
  charactersList.innerHTML = htmlString;
};

loadCharacters();
