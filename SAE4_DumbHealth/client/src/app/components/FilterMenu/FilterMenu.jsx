import "./FilterMenu.css";
import { useState } from "react";

const FilterMenu = (props) => {
    const [sessionFilterActive, setSessionFilterActive] = useState(false);

    const toggleSessionFilter = () => {
        setSessionFilterActive(!sessionFilterActive);
    };

    const toggleAccordion = (e) => {
        e.currentTarget.parentNode.classList.toggle("active");
    };

    const muscleGroups = {
        "Muscle": [
            { name: "traps", label: "Trapèzes" },
            { name: "biceps", label: "Biceps" },
            { name: "triceps", label: "Triceps" },
            { name: "chest", label: "Pectoraux" },
            { name: "middle_back", label: "Dorsaux" },
            { name: "lower_back", label: "Lombaires" },
            { name: "abdominals", label: "Abdominaux" },
            { name: "adductors", label: "Aducteurs" },
            { name: "abductors", label: "Abducteurs" },
            { name: "glutes", label: "Fessiers" },
            { name: "quadriceps", label: "Quadriceps" },
            { name: "hamstrings", label: "Ischio-jambiers" },
            { name: "calves", label: "Mollets" },
            { name: null, label: "Tout" }
        ],

        Type: [
            { name: "cardio", label: "Cardio" },
            { name: "olympic_weightlifting", label: "Discipline Olympique" },
            { name: "plyometrics", label: "Pliométrie" },
            { name: "powerlifting", label: "Powerlifting" },
            { name: "strength", label: "Force" },
            { name: "stretching", label: "Étirement" },
            { name: "strongman", label: "Strongman" },
            { name: null, label: "Tout" }
        ],

        Difficulté: [
            { name: "beginner", label: "Débutant" },
            { name: "intermediate", label: "Intermédiaire" },
            { name: "expert", label: "Expert" },
            { name: null, label: "Tout" }
        ],
    };

    return (
        <div>
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
            <section
                id="session-filter"
                className={`session-filter ${
                    sessionFilterActive ? "active" : ""
                }`}
            >
                <article>
                    <div id="accordion">
                        <div className="filter-section top">
                            <header
                                className="accordion-toggle"
                                onClick={toggleAccordion}
                            >
                                <h6>Muscle</h6>
                                <i className="material-icons">
                                    keyboard_arrow_up
                                </i>
                            </header>
                            <div className="accordion-content">
                                {muscleGroups["Muscle"].map((e) => {
                                    return (
                                        <div className="field-wrapper" key={e.name}>
                                            <input
                                                name="muscle"
                                                type="radio"
                                                checked={e.name === props.muscle.value}
                                                onChange={() =>
                                                    props.muscle.fn(e.name)
                                                }
                                            />
                                            <label>{e.label}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="filter-section type">
                            <header
                                className="accordion-toggle"
                                onClick={toggleAccordion}
                            >
                                <h6>Type</h6>
                                <i className="material-icons">
                                    keyboard_arrow_up
                                </i>
                            </header>
                            <div className="accordion-content">
                                {muscleGroups["Type"].map((e) => {
                                    return (
                                        <div className="field-wrapper" key={e.name}>
                                            <input
                                                name="type"
                                                type="radio"
                                                checked={e.name === props.type.value}
                                                onChange={() =>
                                                    props.type.fn(e.name)
                                                }
                                            />
                                            <label>{e.label}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="filter-section difficulty">
                            <header
                                className="accordion-toggle"
                                onClick={toggleAccordion}
                            >
                                <h6>Difficulté</h6>
                                <i className="material-icons">
                                    keyboard_arrow_up
                                </i>
                            </header>
                            <div className="accordion-content">
                                {muscleGroups["Difficulté"].map((e) => {
                                    return (
                                        <div className="field-wrapper" key={e.name}>
                                            <input
                                                name="difficulty"
                                                type="radio"
                                                checked={e.name === props.difficulty.value}
                                                onChange={() =>
                                                    props.difficulty.fn(e.name)
                                                }
                                            />
                                            <label>{e.label}</label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <nav
                        className="session-filter-tab"
                        onClick={toggleSessionFilter}
                    >
                        <p className="">
                            Filter Your Sessions{" "}
                            <i className="material-icons">
                                keyboard_arrow_left
                            </i>
                        </p>
                    </nav>
                </article>
            </section>
        </div>
    );
};

export default FilterMenu;
