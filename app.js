let offset = 0;
const limit = "&limit=20";

let btnAnt = document.getElementById("btnAnterior");
let btnSig = document.getElementById("btnSiguiente");
let container = document.getElementById("container");
let contenedor = document.getElementById("contenedor");

/* Botones Reemplazados por evento Scroll
btnSig.addEventListener('click', () =>{
    console.log('boton sig');
    offset+=10;
    obtenerPokemones()
})
btnAnt.addEventListener('click', () =>{
    console.log('boton atras');
    offset-=10;
    obtenerPokemones()
}) */




let dataVisor = 0;
async function obtenerPokemones() {
    try {
        const listaPokemones = await fetch(
            `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=15`
            );
            const listaPokemonesData = await listaPokemones.json();
            
            // console.log(listaPokemonesData);
            
            //SI QUIERES CONSULTAR SOLO UN POKEMON
            
        const infoPokemonUno = await fetch(listaPokemonesData.results[dataVisor].url);
        const infoPokemonUnoData = await infoPokemonUno.json();
        console.log(infoPokemonUnoData)
        pokemon = {
            id: infoPokemonUnoData.id,
            name: infoPokemonUnoData.name,
            stats: {
                hp: infoPokemonUnoData.stats[0].base_stat,
                atk: infoPokemonUnoData.stats[1].base_stat,
                def: infoPokemonUnoData.stats[2].base_stat,
                atk_esp: infoPokemonUnoData.stats[3].base_stat,
                def_esp: infoPokemonUnoData.stats[4].base_stat,
                spd: infoPokemonUnoData.stats[5].base_stat,
            },
            sprites: {
                front_default: infoPokemonUnoData.sprites.front_default,
                back_default: infoPokemonUnoData.sprites.back_default,
                front_shiny: infoPokemonUnoData.sprites.front_shiny,
                back_shiny: infoPokemonUnoData.sprites.back_shiny
            },
            ability: {
                ability_1: infoPokemonUnoData.abilities[0].ability.name,
                ability_2: infoPokemonUnoData.abilities[1].ability.name
            }

        }
        console.log(pokemon);

        //SI QUIERES CONSULTAR TODOS LOS POKEMON (PRO)
        const listaRequests = [];
        for (const result of listaPokemonesData.results) {
            listaRequests.push(fetch(result.url).then((res) => res.json()));
        }
        const dataPokemon = await Promise.all(listaRequests);

        // console.log(dataPokemon)

        pintarPokemon(dataPokemon);
        
    } catch (ex) {
        console.error(ex);
    }
}
container.addEventListener("scroll", (e) => {
    let alturaScroll = container.scrollHeight - 499;
    let scrolled = container.scrollTop;
    
    // console.log(`scrolled ${scrolled}`);
    // console.log(`alturaScroll ${alturaScroll}`);
    
    
    
    if (alturaScroll === scrolled) {
        offset += 15;
        
        obtenerPokemones(dataVisor);
    }
});
function pintarPokemon(dataPokemon) {
    dataPokemon.forEach((poke) => {
        container.innerHTML += `
    <div class="card-contenedor">
        <div class="cardPokemon">
            <div class="cardPokemon--Datos">
                <span class="id_pokemon">ID#${poke.id}</span>
                <h3 class="cardPokemon--Datos_nombre">${poke.name}</h3>
                <img src="${poke.sprites.front_default}" class="img_pokemon">
                
            </div>
        </div>
    </div>
    `;
    });
}

function getImgTipos(types) {
    const typeImg = types.map(
        (type) =>
            `<img src="img/tipo_${type.type.name}.jpg" alt="" class="img-fluid" width="65">`
    );
    return typeImg.join("");
}

obtenerPokemones();

container.addEventListener('click', (e) =>{
    const visorPokemon = document.getElementById('visorPokemon');
    let pokemonVisor = e.target.childNodes[1].firstElementChild.parentElement.firstElementChild.children[0].innerText;
    
    dataVisor = parseInt(pokemonVisor.slice(3, 10) - 1)
    console.log(pokemonVisor);
    
    visorPokemon.innerHTML = `${pokemon.name}`
    
    obtenerPokemones(dataVisor);
    
})


/* 
<!-- Stats Pokemon -->
<div class="cardPokemon--Tipo">
    ${getImgTipos(poke.types)}
</div>
                    <div class="">
                        <div class="col-3 d-inline">
                            <span class="card-text"><small class="text-muted">HP:</small></span>
                            <span class="card-te"><small class="text-muted">${
                                poke.stats[0].base_stat
                            }.</small></span>
                        </div>
                        <div class="col-3 d-inline">
                            <span class="card-text"><small class="text-muted">ATK:</small></span>
                            <span class="card-text"><small class="text-muted">${
                                poke.stats[1].base_stat
                            }.</small></span>
                        </div>
                        <div class="col-3 d-inline">
                            <span class="card-text"><small class="text-muted">DEF:</small></span>
                            <span class="card-text"><small class="text-muted">${
                                poke.stats[2].base_stat
                            }.</small></span>
                        </div>
                        <div class="col-3 d-inline">
                            <span class="card-text"><small class="text-muted">ATK_SPE:</small></span>
                            <span class="card-text"><small class="text-muted">${
                                poke.stats[3].base_stat
                            }.</small></span>
                        </div>
                        <div class="col-3 d-inline">
                            <span class="card-text"><small class="text-muted">DEF_SPE:</small></span>
                            <span class="card-text"><small class="text-muted">${
                                poke.stats[4].base_stat
                            }.</small></span>
                        </div>
                        <div class="col-3 d-inline">
                            <span class="card-text"><small class="text-muted">SPD:</small></span>
                            <span class="card-text"><small class="text-muted">${
                                poke.stats[5].base_stat
                            }.</small></span>
                        </div>
                    </div> */