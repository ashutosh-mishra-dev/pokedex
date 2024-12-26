
import axios from "axios";
import { useEffect, useState} from "react";
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
    
    // step 1 :
    // const [x, setX] = useState(0);
    // const [y, setY] = useState(0);
    
    // step 2 :
    // useEffect(() => {
    //     console.log("Effect called");
        
    // },[x]);

// step 3 :
//     return ( 
//         <>
//             <div>
//                 X : {x} <button onClick={()=> setX(x + 1)}>Inc</button>
//                 <button onClick={()=> setX(x - 1)}>Dec</button>
//             </div>
//             <div>
//                 Y : {y} <button onClick={()=> setY(y +1)}>Inc</button>
//                 <button onClick={()=> setY(y-1)}>Dec</button>
//             </div>
//         </>
//     );
    
    // const [pokemonList,setPokemonList] = useState([]);
    // const [isLOading,setIsLOading] = useState(true);  // yha bta rhe hai ki abhi data doad nhi hua hai to print karega loading...

    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    // const [nextUrl, setNextUrl] = useState('');
    // const [prevUrl, setPrevUrl] = useState('');

    //ham jo upar multiple useState use kar rhe hai vo sahi nhi h uske liye ham agar aisa multiple useState use karna pade tab ham ek object bna kr useState ka use kar sakte hai

    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLOading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: ''

    });

    async function downloadPokemons() {
        // setIsLOading(true); Ab hamne useState ko object me use kiya h to es tarah nhi likh sakte hai
        setPokemonListState((state) => ({...state, isLOading: true}))
        // const response = await axios.get(pokedexUrl); // sare pokemon ko fetch kar rhe hai. ( this downloads list of 20 pokemons )
        const response = await axios.get(pokemonListState.pokedexUrl); //hamne yha use state ko object me use kiya h es vajah se aisa likhana padega
        // setNextUrl(response.data.next); // next url pr jane ke liye link
        
        setPokemonListState((state) => ({ // yha hame extra function ex. (state) => (). pass karna pad rha,state vah ek object ka name h jise lena jaruri h becouse documentation me diya h.
            ...state,
            nextUrl: response.data.next, 
            prevUrl: response.data.previous
        })); //hamne yha use state ko object ki vajah se change kiya. ab ek me hi ham next url aur previous url ko likh sakte h
        // next url aur previous url ko alag se likhane ki jarurat nhi hai.
        
        // yha hame extra function ex. () => (). pass karna pad rha becouse multiple time setPokemonListState use kar rhe hai agar ham multiple time setPokemonListState nhi use karte tab niche ka ex 
        // setPokemonListState({...pokemonListState,
        //     nextUrl: response.data.next, 
        //     prevUrl: response.data.previous
        // });
        
        // setPrevUrl(response.data.previous); // // previous url pr jane ke liye link
        
        console.log(response);
        
        const pokemonResults = response.data.results; // yha ham direct pokemon ke name aur url ko select kar sakte h ya print karna chahe to kar sakte hai. ( we get the array of pokemons from result )
        
        // iterating over the array of pokemon and using their url to create an array of promises
        //that will downloadthose 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url)); // single pokemon ka details find karenge
        
        // passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); // axios ka method hai all() esme ham array of promisess pass karenge jisme ham ek tecnolly array of axios.get ke response ko ya axios.get ke promisses hai sare ke sare axios.all() me pass karenge to sara ka sara data download ho jayega tab ye hame lake de dega. 
        
        //console.log(pokemonData);
        // now iterate on the data of each pokemon, and extract id, name, image, types.
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return { 
                id: pokemon.id,
                name: pokemon.name, 
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        });

        console.log(pokeListResult);
        //setPokemonList(pokeListResult);
        setPokemonListState((state) => ({
            ...state, 
            pokemonList: pokeListResult,
            isLOading: false
        })); //hamne yha use state ko object ki vajah se change kiya. aur hamne jo niche isLoading : false kiya vo bhi yha ek hi jagah use ho gya.

        //setIsLOading(false); // data download hone ke bad loading... nhi show karega yha ab Data downloaded show karega
    }
    // useEffect(() => {
    //     downloadPokemons();
    // },[pokedexUrl]);

    useEffect(() => {
        downloadPokemons();
    },[pokemonListState.pokedexUrl]); //hamne yha use state ko object ki vajah se change kiya.

    return ( 
        <div className="pokemon-list-wrapper">
            
            {/* <div className="pokemon-wrapper">
                {(isLOading) ? 'Loading...' : 
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            </div> */}

            {/* hamne yha use state ko object ki vajah se change kiya. */}
            <div className="pokemon-wrapper">
                {(pokemonListState.isLOading) ? 'Loading...' : 
                    pokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            </div>
            {/* <div className="controls">
                <button disabled = {prevUrl == null} onClick={ () => setPokedexUrl(prevUrl) }>Prev</button>
                <button disabled = {nextUrl == null} onClick={ () => setPokedexUrl(nextUrl) }>Next</button>
            </div> */}

            {/* hamne yha use state ko object ki vajah se change kiya. */}
            <div className="controls">
                <button disabled = {pokemonListState.prevUrl == null} onClick={ () => {
                    const urlToSet = pokemonListState.prevUrl;
                    setPokemonListState({...pokemonListState, pokedexUrl: urlToSet }) 
                    }}>Prev</button>
                <button disabled = {pokemonListState.nextUrl == null} onClick={ () => {
                    const urlToSet = pokemonListState.nextUrl;
                    setPokemonListState({...pokemonListState, pokedexUrl: urlToSet }) 
                    }}>Next</button>
            </div>
            
        </div>
    );

 }

export default PokemonList;
