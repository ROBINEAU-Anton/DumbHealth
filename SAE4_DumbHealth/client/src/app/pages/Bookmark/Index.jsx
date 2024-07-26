import './Bookmark.css'


const Index = () => {

    const goBack = () => {
        window.history.back()
    }

    return (
        <div className="page">
            <h1>COMING SOON</h1>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            <i onClick={goBack}>close</i>
        </div>
    );
};

export default Index;