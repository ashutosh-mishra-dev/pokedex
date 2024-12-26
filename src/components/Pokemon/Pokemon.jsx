
import { Link } from 'react-router-dom';
import './Pokemon.css';

function Pokemon({ name, image, id }) {
    return (
        <div className='pokemon'>

            {/* link yha hamne  anchor tag <a></a> ki jagah use kiya h becouse "anchor tag" ke use se  page refresh ho jata hai. agar page refresh ho jaye to SPA ka koi mtbala nhi hoga. link  react-router-dom module ki property hai*/}
            <Link to={`/pokemon/${id}`}>
                <div className='pokemon-name'>{ name }</div>
                <div>
                    <img className='pokemon-image' src={image} alt="no image" />
                </div>
            </Link>
        </div>
    );
}

export default Pokemon;