import './HomeCard.css'

const HomeCard = (props) =>
    <a href={props.route}>
        <img alt={props.alt} src={props.img}/>
        <h2 className={props.className}>{props.title}</h2>
    </a>

export default HomeCard