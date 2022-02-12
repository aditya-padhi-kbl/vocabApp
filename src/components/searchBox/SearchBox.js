import './SearchBox.css';
import {useDispatch, useSelector} from "react-redux";
import Text from "antd/es/typography/Text";

import {getWordMeaning, resetWord, setWord} from "../../features/dictionaryWord";
import {Button, Input, Badge, Divider} from "antd";
import {useEffect} from "react";
import {getWordList, updateMeaningList, updateWordList} from "../../features/dictionaryWordList";
import getRandomValue from "../../services/randomIndexGenerator";
import {getCumulativeScore} from "../../features/cumulativeScore";
import {setModalDisplayMode} from "../../features/modalDisplayMode";
const {Search} = Input;


function SearchBox() {
    const dispatch = useDispatch();
    const cachedWordList = useSelector(getWordList);
    const cumulativeScore = useSelector(getCumulativeScore);
    const onSearch = (event) => {
        dispatch(resetWord());
        let clickedWord = event || "hello";
        dispatch(setModalDisplayMode(1));
        dispatch(setWord(clickedWord))
        dispatch(getWordMeaning(clickedWord))
    }

    function randomWordPicker() {
        let randomIdx = getRandomValue(0, cachedWordList.length);
        let word = cachedWordList[randomIdx];
        dispatch(setModalDisplayMode(0));
        dispatch(resetWord());
        dispatch(setWord(word?.word))
        dispatch(getWordMeaning(word?.word))
    }


    /**
     * One time activity when the user loads the page for the first time fetch everything from cache and store it in the redux store so that other can utilize it
     */
    useEffect(() => {
        const list = JSON.parse(localStorage.getItem("wordList")) ?? [];
        const wordList = list.reduce( (acc, value) => {
            acc = [...acc, {
                word: value.word, queriedOn: value.queriedOn, id: value.id
            }]
            return acc;
        }, [])
        dispatch(updateMeaningList(list));
        dispatch(updateWordList(wordList))
    }, []);
  return (
    <>
        <Input.Group>
            <Search
                placeholder="Search a word"
                allowClear
                enterButton
                style={{ width: "50%" }}
                onSearch={onSearch}
            />
            <Button onClick={randomWordPicker} disabled={cachedWordList.length === 0} style = {{marginLeft: '2px'}}>Guess</Button>
        </Input.Group>
        <Divider>
            <Text strong>Your Cumulative Score <Badge count={cumulativeScore} /></Text>
        </Divider>
    </>
  );
}

export default SearchBox;
