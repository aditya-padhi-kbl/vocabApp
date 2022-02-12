import Text from "antd/es/typography/Text";
import DefinitionComponent from "./DefinitionComponent";

const MeaningComponent = ({meaning}) => {
    const {partOfSpeech = "", definitions = []} = {...meaning};

    return (
        <>
            <span>Part of Speech <Text type="success">{partOfSpeech}</Text></span>
            <ul className="hide-list-style">
                {definitions.map((definition, index) => <li key={index}><DefinitionComponent {...definition}/><hr /></li>)}
            </ul>

        </>
    )
}

export default MeaningComponent;