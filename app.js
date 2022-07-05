let offset = 0;
const limit = '&limit=20';

let btnAnt = document.getElementById('btnAnterior');
let btnSig = document.getElementById('btnSiguiente');

btnSig.addEventListener('click', () =>{
    offset += 20;
    getData();
    
})
btnAnt.addEventListener('click', () =>{
    offset -= 20;
    getData();
})
let id = 1;
const url = `https://pokeapi.co/api/v2/type/4/`;

const getData = () => {
    fetch(`${url}`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
    })
    
}
const pokeData = data => {
    for (pokemon in data) {
        let pokemon = { 
            nombre : data.name,
            id : data.id,
            habilidad_1 : data.abilities[0],
            habilidad_2 : data.abilities[1]
        }
        
        console.log(pokemon)
    }
    Object.keys(pokeData).forEach(key =>{
        document.getElementById(key).textContent = pokeData[key];
        console.log(pokeData[key])
    })
}


getData();
pokeData();