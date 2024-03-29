import loaderGif from "../assets/loader.gif";
import styles from "./Loader.module.css";

const Loader = () => {
    return (<div className={styles.loaderPage}>
        <img className={styles.spinner} src={loaderGif} alt="...Loading"></img>
    </div>)
}

export default Loader;