import React, { useRef } from 'react';
import Webcam from 'react-webcam';

const SelfieCapture = ({ setSelfie, selfie, nextStep }) => {
    const webcamRef = useRef(null);

    const capture = async () => {
        if (webcamRef.current) {
            const imageSrc = await webcamRef.current.getScreenshot();
            setSelfie(imageSrc);

        }
    };


    const videoConstraints = {
        width: 720,
        height: 1280,
        facingMode: "user"
    };

    return (
        <div className={`cont-step webcam-open`}>
            <div className='headers-cont'>
                <h1>Tomate una selfie</h1>
                <h2>Necesitamos validar tu identidad</h2>
            </div>
            {!selfie ?
                <div className="webcam-container-selfie">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        mirrored={true}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        className="webcam-selfie"
                    />
                    <div className="head-shape"></div>
                </div>
                :
                <img src={selfie} alt='' />
            }

            {!selfie ?
                <button className='l-blue-btn' onClick={capture}>
                    <img src="/img/camara.svg" alt='' width="28px" height="27px" /> Tomar foto
                </button>
                :
                <button className='l-blue-btn' onClick={nextStep}>
                    <img src="/img/upload.svg" alt='' width="38px" height="38px" />Confirmar
                </button>
            }
        </div>
    );
};

export default SelfieCapture;
