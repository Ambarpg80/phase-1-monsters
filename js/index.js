//document.addEventListener('DOMContentLoaded', ()=>{})
fetch(`http://localhost:3000/monsters/?_limit=50/?_limit=50&_page=1`)
.then(res=>res.json())
.then(monsterData=>{
    showMonsters(monsterData);
    monsterForm()
})


function showMonsters(monsters){
    for(let monster of monsters){
    const monsterDiv = document.getElementById('monster-container')
    let h2 = document.createElement('h2');
    let h4 = document.createElement('h4');
    let p = document.createElement('p');
    h2.innerText = `${monster.name}`
    h4.innerText = `${monster.age}`
    p.innerText = `${monster.description}`
    monsterDiv.append(h2,h4,p)
    }
}

function monsterForm(){
    const createDiv = document.getElementById('create-monster');
    const form = document.createElement('form');
    let inputName = document.createElement('input');
    let inputAge = document.createElement('input');
    let inputDescription = document.createElement('input');
    let button = document.createElement('button');
    inputName.id= "name";
    inputAge.id= "age";
    inputDescription.id= "description";
    button.type = 'submit';
    button.innerText = 'Create';
    inputName.placeholder= "name..."
    inputAge.placeholder= "age..."
    inputDescription.placeholder= "description..."
    form.append(inputName, inputAge, inputDescription, button)
    createDiv.append(form)

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        addAMonster(name,age,description)
    })
}


function addAMonster(name,age,description){
    //Reference div for where monster list is being displayed onto the page
    const monsterDiv = document.getElementById('monster-container')
    //Elements being created for info added onto the page
    let h2 = document.createElement('h2');
    let h4 = document.createElement('h4');
    let p = document.createElement('p');
    //Reference for where input values are coming from
    name = document.querySelector('input#name');
    age = document.querySelector('input#age');
    description = document.querySelector('input#description');
    //innerText for added elements = input.value
        h2.innerText = `${name.value}`;
        h4.innerText = `${age.value}`;
        p.innerText = `${description.value}`;
    
fetch('http://localhost:3000/monsters',{
    method: 'POST',
    headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({
        "name" : `${name.value}`, 
        "age" : `${age.value}`, 
        "description" : `${description.value}` 
        })
    })
    
    //append elements to div
    monsterDiv.append(h2,h4,p)
}

const backBtn = document.getElementById('back')
const fwdBtn = document.getElementById('forward')

fwdBtn.addEventListener('click', ()=>{
   
    fetch(`http://localhost:3000/monsters/?_limit=50`)
    .then(res=>res.json())
    .then(monsters=>{
        // const monsterDiv = document.getElementById('monster-container')
        // monsterDiv.innerText = ""
        showMonsters(monsters)
    })
})
backBtn.addEventListener('click', ()=>{
    
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=100`)
    .then(res=>res.json())
    .then(monsters=>showMonsters(monsters))
})
