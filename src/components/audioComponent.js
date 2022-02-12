import {useRef} from "react";

import {AudioOutlined} from "@ant-design/icons";

const AudioComponent = ({text, audio}) => {
    let audioRef = useRef();
    function audioClicked() {
        audioRef.current.play();
    }
    return (
        <>
            <>
                <AudioOutlined onClick={audioClicked}/> <span>{text}</span>
            </>
            {audio ? <audio
                ref={audioRef}
                style={{display: "none"}}
                controls
                src={audio}>
                Your browser does not support the
                <code>audio</code> element.
            </audio>: null}
        </>
    )
}

export default AudioComponent;