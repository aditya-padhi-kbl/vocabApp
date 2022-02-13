import './SearchBox.css';
import {useDispatch, useSelector} from "react-redux";
import Text from "antd/es/typography/Text";

import {getWordFetchState, getWordMeaning, resetWord, setWord} from "../../features/dictionaryWord";
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
    const searchState = useSelector(getWordFetchState);

    function manageWordProcess(word, displayMode) {
        dispatch(resetWord());
        dispatch(setModalDisplayMode(displayMode));
        dispatch(setWord(word))
        dispatch(getWordMeaning(word))
    }
    const onSearch = (value = "hello") => {
        if (value.length > 0) {
            manageWordProcess(value, 1);
        }
    }

    function randomWordPicker() {
        let randomIdx = getRandomValue(0, cachedWordList.length);
        let word = cachedWordList[randomIdx];
        manageWordProcess(word?.word, 0);
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
                placeholder='Search for a word like "hello"'
                allowClear
                enterButton
                style={{ width: "80%" }}
                onSearch={onSearch}
                loading={searchState !== "idle"}
            />
            <Button onClick={randomWordPicker} disabled={(cachedWordList.length === 0) || (searchState !== "idle")} style = {{marginLeft: '2px'}} loading={searchState !== "idle"}>Guess</Button>
        </Input.Group>
        <Divider orientation="left" plain orientationMargin={0}>
            <Text strong>Your Cumulative Score <Badge count={cumulativeScore} /></Text>
        </Divider>
    </>
  );
}

export default SearchBox;
