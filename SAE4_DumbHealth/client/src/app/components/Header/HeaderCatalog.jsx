import './HeaderCatalog.css';

const HeaderCatalog = (props) => {
    const goHome = () => {
        location.href = "/"
    }

    const goUser = () => {
        location.href = "/user"
    }

    const goBookmark = () => {
        location.href = "http://localhost:5173/bookmark"
    }

    return (
        <header>
            <div className="icons">
                <img alt="Index icon" src="../src/assets/bookmark.svg" onClick={goBookmark}/>
                <img alt="Index icon" src="../src/assets/user.svg" onClick={goUser}/>
                <img alt="DumbHealth Logo" src="../src/assets/logoYellow.png" onClick={goHome}/>
            </div>
            <h1>{props.title}</h1>
        </header>
    )
}

export default HeaderCatalog