function fetching() {
  return fetch("http://localhost:3000/characters")
    .then((res) => res.json())
    .then((data) => buildCharacter(data));
}
fetching();

function buildCharacter(character) {
  const ul = document.querySelector("ul");
  character.forEach((element) => {
    const li = document.createElement("li");
    li.innerHTML = element.name;
    ul.appendChild(li);
  });
}


function buildAnimal(animal) {
  let animalcard = document.createElement("div");
  animalcard.className = "animal-Card";
  animalcard.innerHTML = `
  <img src="${animal.image}" alt="${animal.name}">
  <p>Name: ${animal.name}</p>
  <p>Votes: <span id="votes">${animal.votes}</span></p>
  <div class="buttons">
    <button id="vote" onclick="addVote(${animal.id})">Vote</button> 
    <p id="vote-count">Votes: <span id="votes">${animal.votes}</span></p>
    <button id="clear">Clear</button>
  </div>`;
  animalcard.style.display = "block";
  document.querySelector("ul").appendChild(animalcard);
}
buildAnimal()