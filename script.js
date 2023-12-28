//getting the data from our db.json via the server
function fetching() {
  return fetch("http://localhost:3000/characters")
    .then((res) => res.json())
    .then((data) => buildCharacter(data));
}
//calling the function to actually get the data back
fetching();

//function to build the names that will get displayed in our DOM
function buildCharacter(characters) {
  const ul = document.querySelector("ul");
  characters.forEach((element) => {
    const li = document.createElement("li");
    li.innerHTML = element.name;
    li.addEventListener('click', () => fetchAnimal(element.id)); 
    ul.appendChild(li);
  });
}

//fetch the specific animals from the server using the animals id

function fetchAnimal(animalId) { 
  fetch(`http://localhost:3000/characters/${animalId}`)
    .then(response => response.json())
    .then(animal => {
      buildAnimal(animal);
    })
}
//function to build the animal that gets displayed with animal is clicked details
function buildAnimal(animal) {
  const existingAnimalCard = document.querySelector(".animal-Card");
  if (existingAnimalCard) {
    existingAnimalCard.remove();
  }
  let animalcard = document.createElement("div");
  animalcard.className = "animal-Card";
  animalcard.innerHTML = `
    <img src="${animal.image}" alt="${animal.name}">
    <p>Name: ${animal.name}</p>
    <p id="votes">Votes: ${animal.votes}</p>
    <div class="buttons">
      <button id="vote" >Vote</button> 
      <button id="clear">Clear</button>
    </div>`;

    let voteCount = animal.votes; 

    animalcard.querySelector('#vote').addEventListener('click', function () {

      voteCount++;
      animalcard.querySelector('#votes').innerText = `Votes: ${voteCount}`;
    });

    let clear = animal.votes; 

    animalcard.querySelector('#clear').addEventListener('click', function () {
     voteCount = 0;
    animalcard.querySelector('#votes').innerText = `Votes: ${clear}`;
    });
  let showAnimal=document.querySelector('ul')
  showAnimal.appendChild(animalcard)
}



