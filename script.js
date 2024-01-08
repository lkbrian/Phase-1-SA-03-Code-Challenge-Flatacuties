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
    li.addEventListener('click', (event) => {
      event.preventDefault()
      fetchAnimal(element.id)}); 
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
      <button id="vote" type="button">Vote</button> 
      <button id="clear" type="button">Clear</button>
    </div>`;

    animalcard.querySelector('#vote').addEventListener('click',(event)=>{
    event.preventDefault()
      animal.votes += 1
      animalcard.querySelector('#votes').innerHTML = `Votes: ${animal.votes}`
      updateVotes(animal)
    });
    animalcard.querySelector('#clear').addEventListener('click',(event)=>{
    event.preventDefault()
      animal.votes =0
      animalcard.querySelector('#votes').innerHTML = `Votes: ${animal.votes}`
      clearVotes(animal)
    });

  let showAnimal=document.querySelector('ul')
  showAnimal.appendChild(animalcard)
}
//adding votes 
function updateVotes(item) {
  fetch(`http://localhost:3000/characters/${item.id}`,{
    method: 'PATCH',
    headers:{
      "Content-type":"application/json"
    },
    body: JSON.stringify(item)
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
}
// clearing votes
function clearVotes(item) {
  fetch(`http://localhost:3000/characters/${item.id}`,{
    method: 'PATCH',
    headers:{
      "Content-type":"application/json"
    },
    body: JSON.stringify(item)
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
}
