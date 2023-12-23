fetch('http://localhost:3000/characters')
.then((res) =>{
 return res.json();
  })
  .then((data) =>{
    console.log(data)
    return data

  });