let offset = '?offset=0';
const limit = '&limit=1';

let btnAnt = document.getElementById('btnAnterior');
let btnSig = document.getElementById('btnSiguiente');

let imgPokemon = document.querySelector('.imgPokemon');
let nombrePokemon = document.querySelector('.nombrePokemon');
let datosPokemon = document.querySelector('.datosPokemon');
let statsPokemon = document.querySelector('.statsPokemon');

btnSig.addEventListener('click', () =>{
    console.log('boton sig');
    id++;
    getData()
    
})
btnAnt.addEventListener('click', () =>{
    console.log('boton atras');
    id--;
    getData()
})

let id = 4;
const getData = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    fetch(`${url}`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        imgPokemon.src = data.sprites.front_default;
        nombrePokemon.value = data.name;
        datosPokemon.innerHTML = `
        <span>Numero ID: ${data.id}</span>
        <span>Peso: ${data.weight / 10}kg</span>
        <span>Altura: ${data.height / 10}m</span>
        `
        
        console.log(data.types);
    })
}

getData();

