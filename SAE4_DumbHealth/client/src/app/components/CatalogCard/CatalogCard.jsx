import './CatalogCard.css'
import {redirect} from "react-router-dom";


const CatalogCard = (props) => {

    const redirect = () => {
        location.href = `/catalog/exercise/${props.exercise.name.replace(" ", "_")}`
    }

    return (
        <div className="exercise" key={props.exercise.name} onClick={redirect}>
            <h1 className="exercise__name">{props.exercise.name}</h1>
            <h2 className="exercise__muscle">{props.exercise.muscle}</h2>
            <h2 className="exercise__difficulty">{props.exercise.difficulty.replace("_", " ")}</h2>
            <h2 className="exercise__equipment">{props.exercise.equipment}</h2>
        </div>
    );
};

export default CatalogCard;