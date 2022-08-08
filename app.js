let offset = 0;
const limit = "&limit=20";

let btnAnt = document.getElementById("btnAnterior");
let btnSig = document.getElementById("btnSiguiente");
let container = document.getElementById("container");
let contenedor = document.getElementById("contenedor");

let btnMostrar = document.querySelector('.btnMostrar');


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
let id_pokemon = 0;
async function obtenerPokemones() {
    try {
        const listaPokemones = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=15`);
        const listaPokemonesData = await listaPokemones.json();
        // console.log(listaPokemonesData);
            let number = listaPokemonesData.results.length;

        //SI QUIERES CONSULTAR SOLO UN POKEMON
        
        const infoPokemonUno = await fetch(listaPokemonesData.results[id_pokemon].url);
        const infoPokemonUnoData = await infoPokemonUno.json();
        // console.log(infoPokemonUnoData)
        setVisorPokemon(infoPokemonUnoData)
        

        //SI QUIERES CONSULTAR TODOS LOS POKEMON (PRO)
        const listaRequests = [];
        for (const result of listaPokemonesData.results) {
            listaRequests.push(fetch(result.url).then((res) => res.json()));
        }
        const dataPokemon = await Promise.all(listaRequests);

        // console.log(dataPokemon)
        pintarPokemon(dataPokemon);
        getIdPokemon()
        
        scroller()
        
    } catch (ex) {
        console.error(ex);
    }
}

const scroller = () =>{
    container.addEventListener("scroll", (e) => {
        let alturaScroll = container.scrollHeight - 499;
        let scrolled = container.scrollTop;   
        // console.log(`scrolled ${scrolled}`);
        // console.log(`alturaScroll ${alturaScroll}`);
        if (alturaScroll === scrolled) {
            offset += 15;
            obtenerPokemones();
        }
    });
}

function pintarPokemon(dataPokemon) {
    console.log(dataPokemon);
    let visorPokemon = document.getElementById('visorPokemon');
    visorPokemon.innerHTML = `<img src="${dataPokemon[0].sprites.front_default}" alt="">`

    dataPokemon.forEach((poke) => {
        container.innerHTML += `
    <div class="card-contenedor">
        <div class="cardPokemon">
            <div class="cardPokemon--Datos">
                <span id="pokemonID_${poke.id}" class="id_pokemon">ID#${poke.id}</span>
                <h3 class="cardPokemon--Datos_nombre">${poke.name}</h3>
                <img src="${poke.sprites.front_default}" class="img_pokemon">
            </div>
            <button class="btnMostrar" id="btnMostrar"><i class="fa fa-arrow-left" aria-hidden="true"></i> Mostrar</button>
        </div>
    </div>`;
    });
}

function getImgTipos(types) {
    const typeImg = types.map((type) =>`<img src="img/tipo_${type.type.name}.jpg" alt="" class="img-fluid" width="65">`);
    return typeImg.join("");
}





function setVisorPokemon(infoPokemonUnoData){
    
    // console.log(infoPokemonUnoData);
    setpokemon = {
        id: infoPokemonUnoData.id,
        nombre: infoPokemonUnoData.name,
        img: {
            frontDefault: infoPokemonUnoData.sprites.front_default,
            frontDhiny: infoPokemonUnoData.sprites.front_shiny,
            backDefault: infoPokemonUnoData.sprites.back_default,
            backDhiny: infoPokemonUnoData.sprites.back_shiny
        },
        altura: infoPokemonUnoData.height,
        peso: infoPokemonUnoData.weight,
        estadisticas: {
            hp: infoPokemonUnoData.stats[0].base_stat,
            atk: infoPokemonUnoData.stats[1].base_stat,
            def: infoPokemonUnoData.stats[2].base_stat,
            atk_sp: infoPokemonUnoData.stats[3].base_stat,
            def_sp: infoPokemonUnoData.stats[4].base_stat,
            spd: infoPokemonUnoData.stats[5].base_stat,
        }
    }
    console.log(setpokemon);
}
function setPokemon(pokemonObj){
    pokemonID = pokemonObj.querySelector('.id_pokemon').textContent
    pokemonID = parseInt(pokemonID.slice(3, 5))
    console.log(pokemonID);
}

function getIdPokemon(){
    container.addEventListener('click', (e)=>{
        if(e.target.classList.contains('btnMostrar')){
            setPokemon(e.target.parentElement)
            visorPokemon.innerHTML = ``
        }
        
    })
}
function main(){
    obtenerPokemones();
}
main()

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