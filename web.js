const container = document.querySelector(".container");
const charactersList = document.querySelector("#charactersList");
const header = document.querySelector("#header");
let count = document.querySelector(".count");
const footer = document.querySelector("#footer");
const searchBar = document.querySelector(".searchBar");
let hpCharacters = [];

const loadCharacters = async () => {
  try {
    const res = await fetch("https://api.tvmaze.com/shows/5/episodes");
    hpCharacters = await res.json();
    displayCharacters(hpCharacters);
    selectCharacters(hpCharacters);
    btnGetAll()
    originallyWebsiteGet()
  } catch (err) {
    console.error(err);
  }
};
//select
const select = document.createElement("select");
function selectCharacters() {
  for (webpage of hpCharacters) {
    select.classList.add("select");
    const option = document.createElement("option");
    option.innerHTML = `S0${webpage.season}E0${webpage.number} - ${webpage.name}`;
    option.classList = "option";
    select.appendChild(option);
  }
}
header.appendChild(select);
select.addEventListener("change", () => {
  const option = document.getElementsByClassName("option");
  const box = document.getElementsByClassName("character");
  let selects1 = select.options[select.selectedIndex].value;
  //console.log(selects1);
  for (let i = 0; i < select.length; i++) {
    if (option[i].value === selects1) {
      box[i].style.display = "block";
    } else {
      box[i].style.display = "none";
    }
  }
});

function btnGetAll(){
  const btn=document.createElement('button')
  btn.innerHTML="Btn To See All Moves"
  btn.classList.add('btn')
  btn.addEventListener('click' , () =>{
    displayCharacters(hpCharacters);
  })
  header.append(btn)
}
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
//search
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

function originallyWebsiteGet() {
  const a = document.createElement("a");
 a.classList.add('footerLink')
  let link = (a.href = "http://TVMaze.com");
  a.innerHTML = `this page state get data From: TVMaze.com`;
  footer.style.textAlign='center'

  footer.appendChild(a)
}
loadCharacters();
