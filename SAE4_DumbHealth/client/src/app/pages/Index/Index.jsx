import './Index.css';
import HeaderHome from '../../components/Header/HeaderHome.jsx';
import SearchInput from "../../components/SearchInput/SearchInput.jsx";
import HomeCard from "../../components/HomeCard/HomeCard.jsx";
export default function Index() {
    return (
        <div className='page'>
            <HeaderHome/>
            <div className="welcome">
                <h1 className="welcomeTitle">
                    Bienvenue chez DumbHealth !
                </h1>
                <h1 className="textDecoration markerFont">
                    DUMBHEALTH
                </h1>
            </div>
            <hr />
            <h3 className="homeDescription">
                Choisissez ici ce qu’il vous plaît ! Une séance toute faite ou seulement un exercice précis,
                vous trouverez plusieurs milliers d'exercices pour vous aider lors de vos séances. <br/>
                Et comme un corps sain ne va pas sans une nutrition équilibrée, nous vous proposons une large
                gamme de recettes pour vous aider dans votre régime quotidient.
            </h3>
            <SearchInput />
            <div className="choiceArea">
                <HomeCard route="/catalog/EXERCICES"
                          alt="exercicesCardBackground"
                          img="src/assets/exercicesPic.jpg"
                          className="exercicesTitle"
                          title="EXERCICES"/>
                <HomeCard route="/catalog/WORKOUTS"
                          alt="workoutsCardBackground"
                          img="src/assets/workoutsPic.jpg"
                          className="workoutsTitle"
                          title="WORKOUTS"/>
                <HomeCard route="/catalog/NUTRITION"
                          alt="NutritionCardBackground"
                          img="src/assets/nutritionPic.jpg"
                          className="nutritionTitle"
                          title="NUTRITION"/>
            </div>

        </div>
    )
}