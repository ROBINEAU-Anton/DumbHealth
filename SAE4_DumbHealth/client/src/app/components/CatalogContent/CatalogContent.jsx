import './CatalogContent.css'
import axios from "axios";
import {useEffect, useState} from "react";
import CatalogCard from "../CatalogCard/CatalogCard.jsx";
import loader from "../../../assets/loader.svg";


const CatalogContent = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [exercises, setExercises] = useState([]);

    if (props.page==="EXERCICES") {
        useEffect(() => {
            const fetchExercises = async () => {
                const pages = parseInt((new URLSearchParams(window.location.search)).get("page"));
                const url = new URL(import.meta.env.VITE_API_URL + '/exe/exercises');
                const params = url.searchParams;
                props.filters.forEach(filter => {
                    if(filter.value != null) params.append(filter.label, filter.value);
                });
                if(pages > 0) params.append('offset', (pages-1)*10);
                url.search = params;
                try {
                    let res = await axios.get(url, { headers: { "x-api-key": "6d8cc6a00e263e4fb4db049443b783da" } });
                    const uniqueExercises = [...new Set(res.data.map(exercise => exercise.name))].map(name => res.data.find(exercise => exercise.name === name));
                    setExercises(uniqueExercises);
                    setLoading(false);
                } catch (e) {
                    console.error(e);
                }
            }

            fetchExercises();
        }, [props.filters]);

        return (
            <div className={isLoading ? "content" : "content displayed"}>
                {isLoading ? (
                    <img alt="Loader" src={loader}/>
                ) : exercises.map((e) => {
                    return <CatalogCard key={e.name} exercise={e}/>;
                })
                }
                {/*<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <i className={!isLoading && page > 1 ? "display" : ""} >keyboard_arrow_left</i>
                <i className={!isLoading && page > 1 ? "display" : ""} >keyboard_arrow_right</i>*/}
            </div>
        );
    }
};

export default CatalogContent;