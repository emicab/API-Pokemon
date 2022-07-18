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

async function obtenerPokemones() {

    try {
    
    const listaPokemones = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const listaPokemonesData = await listaPokemones.json()
    
    console.log(listaPokemonesData)
    
    //SI QUIERES CONSULTAR SOLO UN POKEMON
    
    const infoPokemonUno = await fetch(listaPokemonesData.results[0].url)
    
    const infoPokemonUnoData = await infoPokemonUno.json()
    
    console.log(infoPokemonUnoData)
    
    //SI QUIERES CONSULTAR TODOS LOS POKEMON (PRO)
    
    const listaRequests = []
    
    for (const result of listaPokemonesData.results) {
    
    listaRequests.push(fetch(result.url).then(res => res.json()))
    
    }
    
    const infoTodosPokemones = await Promise.all(listaRequests)
    
    console.log(infoTodosPokemones)
    
    console.log(infoTodosPokemones[0].sprites.front_default);
    } catch (ex) {
    
    console.log(ex)
    
    }
    
    }
    
    obtenerPokemones();
