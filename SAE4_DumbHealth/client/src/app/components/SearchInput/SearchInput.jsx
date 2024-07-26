import './SearchInput.css'
import {useState} from "react";

export default function SearchInput() {

    const [isFocus, setFocus] = useState(false);

    return (
        <div className="searchBar">
            <div className="inputBar">
                <input type="text" className="searchInput" placeholder="Rechercher..."
                       onFocus={() => setFocus(true)}
                       onBlur={() => setFocus(false)}
                       onKeyDown={(event) => this.handlePressEnter(event)}
                />
            </div>
            <button type="button" onClick={() => location.href = "/catalog?type=SEARCH"}
                    className={isFocus ? "searchButton focused" : "searchButton"}>
                <img alt="Search Button" src="src/assets/search.svg"/>
            </button>
        </div>
    )
}