import {useDispatch, useSelector} from "react-redux";
import {getSearchedWord, getSearchedWordMeaning, getSynonyms, resetWord} from "../features/dictionaryWord";
import {useEffect, useRef, useState} from "react";
import {Button, Divider, Input, List, message, Modal} from "antd";
import React from "react";
import Phonetic_List from "./phonetic/phoneticList";
import Text from "antd/es/typography/Text";
import MeaningComponent from "./MeaningComponent";
import {getModalDisplayMode} from "../features/modalDisplayMode";
import {resetCumulativeScore, setCumulativeScore} from "../features/cumulativeScore";
const Result = () => {
    const [showModal, setShowModal]= useState(false);
    const typedWord = useSelector(getSearchedWord);
    const typedWordMeaning = useSelector(getSearchedWordMeaning);
    const modalDisplayMode = useSelector(getModalDisplayMode);
    const dispatch = useDispatch();
    const synonymRef= useRef();
    const synonymList = useSelector(getSynonyms)
    useEffect(() => {
        if (typedWordMeaning.length >0) {
            setShowModal(true)
        }
    }, [typedWord, typedWordMeaning.length]);

    const checkSynonymHandler = () => {
        if (synonymList.includes(synonymRef?.current?.state?.value)) {
            message.success({
                icon: <></>,
                content: 'You guessed it right! 🙌'
            });
            dispatch(setCumulativeScore(1))
        } else {
            message.info({
                icon: <></>,
                content: 'Better Try next Time 😊'
            });

            dispatch(resetCumulativeScore())
        }
    }

   return <>
       <Modal
           width={800}
           title={modalDisplayMode === 0 ? <section>The random word is  <Text>{typedWord}</Text></section>: null}
        destroyOnClose={true}
        visible={showModal}
        onOk={() => setShowModal(false) && dispatch(resetWord())}
        onClose={() => setShowModal(false) && dispatch(resetWord())}>

           {(modalDisplayMode === 0) ? <Input.Group compact>
               <Input style={{ width: 'calc(100% - 200px)' }} placeholder={`Enter a synonym for ${typedWord}`} ref = {synonymRef}/>
               <Button type="primary" onClick={checkSynonymHandler}>Submit</Button>
           </Input.Group>: <Text strong>You searched for <span>{typedWord}</span></Text>}
            <Divider />
           <div
               style={{
                   height: 400,
                   overflow: 'auto',
                   padding: '0 16px',
                   border: '1px solid rgba(140, 140, 140, 0.35)',
               }}
           >
               <List
               itemLayout = "vertical"
               dataSource={typedWordMeaning}
               renderItem={item => {
                   const {
                       phonetics = [],
                       id,
                       origin = "",
                       meanings = []
                   } = {...item}
                   return (
                       <List.Item key = {id}>
                           <Phonetic_List phoneticList  = {phonetics}/>
                           <Divider orientation="left" orientationMargin="0">Origin</Divider>
                           <span>{origin}</span>
                           <Divider orientation="left" orientationMargin="0">Meaning</Divider>
                           <ol>
                               {
                                   meanings.map((meaning, index) => (
                                       <li key={index}><MeaningComponent meaning = {meaning}/></li>
                                   ))
                               }
                           </ol>

                       </List.Item>
                   )
               }}
           /></div>
       </Modal>
   </>

}

const MemoizedResult = React.memo(Result);
export default MemoizedResult;