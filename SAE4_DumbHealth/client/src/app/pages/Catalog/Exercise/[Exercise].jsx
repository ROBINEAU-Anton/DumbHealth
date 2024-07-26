import './Exercise.css'

import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import HeaderCatalog from "../../../components/Header/HeaderCatalog.jsx";

export default function Exercise() {
    const {Exercise} = useParams()
    Exercise.replace("_", " ")
    const [isLoading, setIsLoading] = useState(true)
    const [exercise, setExercise] = useState([])

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                let res = await axios.get(import.meta.env.VITE_API_URL + '/exe/exercises' + `?name=${Exercise}`, {headers: {"x-api-key": "6d8cc6a00e263e4fb4db049443b783da"}});
                setExercise(res.data);
                setIsLoading(false);
            } catch (e) {
                console.error(e);
            }
        };

        fetchExercise();
    }, [Exercise]);

    const close = () => {
        window.history.back()
    }

    return (
        <div className="page">
            <div className={isLoading ? "content" : "content displayed"}>
                {isLoading ? (
                    <img alt="Loader" src="../../src/assets/loader.svg"/>
                ) : (
                    <div>
                        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                        <i onClick={close}>close</i>
                        <h1>{exercise[0].name}</h1>
                        <h3>Muscle : {exercise[0].muscle}</h3>
                        <h3>Difficulté : {exercise[0].difficulty}</h3>
                        <h4>Type : {exercise[0].type}</h4>
                        <h4>Matériel : {exercise[0].equipment}</h4>
                        <h6>{exercise[0].instructions}</h6>
                    </div>
                )
                }
            </div>
        </div>
    );
};
