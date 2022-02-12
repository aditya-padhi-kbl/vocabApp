import {useDispatch, useSelector} from "react-redux";
import {getWordList} from "../../features/dictionaryWordList";
import {List} from "antd";
import styles from "./cacheList.module.css"
import {useEffect, useState} from "react";
import {getSearchedWord, getWordMeaning, resetWord, setWord} from "../../features/dictionaryWord";
import {setModalDisplayMode} from "../../features/modalDisplayMode";
import Text from "antd/es/typography/Text";

const sortArrayOfObject = (arrayList = [], sort = "asc") => {
    return JSON.parse(JSON.stringify(arrayList)).sort((a, b) => {
        return (sort === "asc") && a?.word?.localeCompare(b?.word)
    })
}
const CACHE_LIST = ({sortMode = "asc"}) => {
    const wordSearchList = useSelector(getWordList);
    const dispatch = useDispatch();
    const sortedWordList = sortArrayOfObject(wordSearchList, sortMode);
    const searchedWord = useSelector(getSearchedWord);
    const [filteredList, setFilteredList] = useState([]);
    useEffect(() => {
        setFilteredList(JSON.parse(JSON.stringify(sortedWordList)))
    }, [searchedWord, wordSearchList.length])

    const wordClickHandler = clickedWord => {
        dispatch(resetWord());
        dispatch(setModalDisplayMode(1))
        dispatch(setWord(clickedWord))
        dispatch(getWordMeaning(clickedWord))
    }
    return (
        <>
            <Text>Your visited Words:-</Text>
            <div className={styles.scrollableDiv}>
                <List
                    dataSource = {filteredList}
                    bordered
                    renderItem = {item => {
                        let date = new Date(item.queriedOn);
                        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric', minute: 'numeric', second: 'numeric' };
                        return (<List.Item key = {item.id}>
                            <List.Item.Meta
                                title={<span onClick={() => wordClickHandler(item.word)}>{item.word}</span>}
                                description={`This word was searched on ${new Intl.DateTimeFormat('en-US', options).format(date)}`}
                            />
                        </List.Item>)
                    }
                    }/>
            </div>
        </>

    )
}

export default CACHE_LIST;