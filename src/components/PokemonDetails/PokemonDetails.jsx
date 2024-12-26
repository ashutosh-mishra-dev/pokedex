import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './PokemonDetails.css';

function PokemonDetails() {
    const {id} = useParams();
    //console.log("pokemon id is : "+id);
    const [pokemon, setPokemon] = useState({});
    
    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name)
        })
        
    }

    useEffect(()=>{
        downloadPokemon();
    },[]);
    return (
        <div className="pokemon-details-wrapper">
            <img className="pokemon-details-image" src={ pokemon.image } alt="not found" />
            <div className="pokemon-details-name"><span>{ pokemon.name }</span> </div>
            <div className="pokemon-details-name">Height: { pokemon.height } </div>
            <div className="pokemon-details-name">Weight: { pokemon.weight } </div>
            <div className="pokemon-details-types">
                { pokemon.types && pokemon.types.map((t) => <div key={t.name}>{t}</div>) } {/* jab ham pokemon.types && ka use nhi kiya the to map() error show ho rha tha */}
            </div>
        </div>
    );
}

export default PokemonDetails;