import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const SelfieCapture = ({ setSelfie, nextStep }) => {
    const webcamRef = useRef(null);

    const capture = async () => {
        if (webcamRef.current) {
            const imageSrc = await webcamRef.current.getScreenshot();
            setSelfie(imageSrc);
            nextStep();
        }
    };

    const videoConstraints = {
        width: 720,
        height: 1280,
        facingMode: "user"
    };

    return (
        <div className="cont-step">
            <div className='headers-cont'>
                <h1>Tomate una selfie</h1>
                <h2>Necesitamos validar tu identidad</h2>
            </div>
            <div className="webcam-container-selfie">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    mirrored={true}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="webcam-feed"
                />
                <div className="head-shape"></div>
            </div>
            <button className='l-blue-btn' onClick={capture}>
                <img src="/img/camara.svg" alt='' width="31px" height="27px" /> Tomar foto
            </button>
        </div>
    );
};

export default SelfieCapture;
