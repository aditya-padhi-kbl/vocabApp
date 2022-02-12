import {Space, Tag} from "antd";
import Text from "antd/es/typography/Text";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSynonyms} from "../features/dictionaryWord";
import {getModalDisplayMode} from "../features/modalDisplayMode";

const MeaningComponent = (props) => {
    const {definition = "", example = "",synonyms = [], antonyms = []} = {...props}
    const modalDisplayMode = useSelector(getModalDisplayMode);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSynonyms(synonyms));
    }, [definition, example, synonyms.length, antonyms.length])

    return (
        <Space direction = "vertical">
            <section><Text strong>Definition</Text> <span>{definition}</span></section>
            <section><Text strong>Example</Text> <span>{example}</span></section>
            {modalDisplayMode ? <>{synonyms.length > 0 ? <>
                    <section>Synonyms</section>
                    <div>
                        {
                            synonyms.map((synonym, index) => <Tag key={index} color="#5ba9a9" style={{marginBottom: '1px'}}>{synonym}</Tag>)
                        }
                    </div>
                </>: null}
                    {antonyms.length > 0 ? <>
                        <section>Antonyms</section>
                        <div>
                            {
                                antonyms.map(
                                    (antonym, index) =>
                                        <Tag key={index} color="#6495ed" style={{marginBottom: '1px'}}>{antonym}</Tag>
                                )
                            }
                        </div>
                    </>: null}</>: null}

        </Space>
        )
}

export default MeaningComponent;