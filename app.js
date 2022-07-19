let offset = 0;
const limit = '&limit=12';

let btnAnt = document.getElementById('btnAnterior');
let btnSig = document.getElementById('btnSiguiente');

let contenedor = document.getElementById('container')

btnSig.addEventListener('click', () =>{
    console.log('boton sig');
    offset+=10;
    obtenerPokemones()
})
btnAnt.addEventListener('click', () =>{
    console.log('boton atras');
    offset-=10;
    obtenerPokemones()
})

async function obtenerPokemones() {

    try {
    
    const listaPokemones = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=10`)
    const listaPokemonesData = await listaPokemones.json()
    
    // console.log(listaPokemonesData)
    
    //SI QUIERES CONSULTAR SOLO UN POKEMON
    
    const infoPokemonUno = await fetch(listaPokemonesData.results[0].url)
    
    const infoPokemonUnoData = await infoPokemonUno.json()
    
    // console.log(infoPokemonUnoData)
    
    //SI QUIERES CONSULTAR TODOS LOS POKEMON (PRO)
    
    const listaRequests = []
    
    for (const result of listaPokemonesData.results) {
    
    listaRequests.push(fetch(result.url).then(res => res.json()))
    
    }
    
    const dataPokemon = await Promise.all(listaRequests)
    
    console.log(dataPokemon)

    pintarPokemon(dataPokemon)
    getTypes(dataPokemon)

    } catch (ex) {
        console.error(ex)
    }
}
    
    obtenerPokemones();

function pintarPokemon(dataPokemon){

    dataPokemon.forEach((poke) =>{
        contenedor.innerHTML += `
    <div class="card d-inline-flex m-3" style="max-width: 275px; max-height:600px !important;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${poke.sprites.front_default}" class="img-fluid rounded-start text-uppercase" alt="..." width="400">
                <p class="card-text text-center"><small class="text-muted">ID: #${poke.id}</small></p>
            </div>
            <div class="col-md-8">
                <div class="card-body p-1 card-types">
                    <h5 class="card-title text-uppercase m-0">${poke.name}</h5>
                    <img src="img/tipo_${poke.types[0].type.name}.jpg" alt="" class="img-fluid" width="65">
                    <!-- Stats Pokemon -->
                    <div class="">
                        <div class="col-3 d-inline">
                            <span class="card-text"><small class="text-muted">HP:</small></span>
                            <span class="card-te"><small class="text-muted">${poke.stats[0].base_stat}.</small></span>
                        </div>
                        <div class="col-3 d-inline">
                            <span class="card-text"><small class="text-muted">ATK:</small></span>
                            <span class="card-text"><small class="text-muted">${poke.stats[1].base_stat}.</small></span>
                        </div>
                        <div class="col-3 d-inline">
                            <span class="card-text"><small class="text-muted">DEF:</small></span>
                            <span class="card-text"><small class="text-muted">${poke.stats[2].base_stat}.</small></span>
                        </div>
                        <div class="col-3 d-inline">
                            <span class="card-text"><small class="text-muted">ATK_SPE:</small></span>
                            <span class="card-text"><small class="text-muted">${poke.stats[3].base_stat}.</small></span>
                        </div>
                        <div class="col-3 d-inline">
                            <span class="card-text"><small class="text-muted">DEF_SPE:</small></span>
                            <span class="card-text"><small class="text-muted">${poke.stats[4].base_stat}.</small></span>
                        </div>
                        <div class="col-3 d-inline">
                            <span class="card-text"><small class="text-muted">SPD:</small></span>
                            <span class="card-text"><small class="text-muted">${poke.stats[5].base_stat}.</small></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    })
}

const getTypes = (dataPokemon) => {
    tiposPokemon = dataPokemon.map(data => data.types)
    console.log(Object.entries(tiposPokemon)); 
}