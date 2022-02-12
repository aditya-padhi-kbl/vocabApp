import AudioComponent from "../audioComponent";
import styles from "./phoneticList.module.css"
const Phonetic_List = ({phoneticList}) => {

    return (<ul className={styles.audioList}>
            {phoneticList
                .map(({text, audio}, index) => (
                    <li key={index}>
                        <AudioComponent text = {text} audio = {audio}/>
                    </li>))
            }
        </ul>)

}

export default Phonetic_List