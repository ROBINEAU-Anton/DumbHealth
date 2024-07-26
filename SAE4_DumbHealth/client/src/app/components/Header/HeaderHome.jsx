import './HeaderHome.css';

const HeaderHome = () => {

    const goUser = () => {
        location.href = "http://localhost:5173/user"
    }

    const goBookmark = () => {
        location.href = "http://localhost:5173/bookmark"
    }

    return (
        <header>
            <div className="icons">
                <img alt="Index icon" src="src/assets/bookmark.svg" onClick={goBookmark}/>
                <img alt="Index icon" src="src/assets/user.svg" onClick={goUser}/>
            </div>
            <img alt="DumbHealth logo" className="logo" src="src/assets/logoYellow.png"/>
        </header>
    )
}

export default HeaderHome