import './Catalog.css'
import HeaderCatalog from "../../components/Header/HeaderCatalog.jsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import FilterMenu from "../../components/FilterMenu/FilterMenu.jsx";
import CatalogContent from "../../components/CatalogContent/CatalogContent.jsx";
import React from "react";

export default function Catalog() {
    const [muscle, setMuscle] = useState(null);
    const [type, setType] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const {Catalog} = useParams();

    const goBack = () => window.history.back();

    return (
        Catalog === "EXERCICES" ? (
            <div className="page">
                <HeaderCatalog title={Catalog}/>
                <FilterMenu muscle={
                    {
                        value: muscle,
                        fn: (v) => setMuscle(v),
                    }
                } type={
                    {
                        value: type,
                        fn: (v) => setType(v),
                    }
                } difficulty={
                    {
                        value: difficulty,
                        fn: (v) => setDifficulty(v),
                    }
                }/>
                <CatalogContent page={Catalog} filters={[
                    {
                        label: 'muscle',
                        value: muscle,
                    },
                    {
                        label: 'type',
                        value: type,
                    },
                    {
                        label: 'difficulty',
                        value: difficulty,
                    }
                ]}/>
            </div>
        ) : (
            <div className="comingSoonDiv">
                <h1 className="comingSoonTitle">COMING SOON</h1>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
                <i className={"comingSoonClose"} onClick={goBack}>close</i>
            </div>
        )
    );
}
