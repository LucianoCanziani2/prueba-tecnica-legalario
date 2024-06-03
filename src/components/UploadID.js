
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Webcam from 'react-webcam';
import Cropper from 'react-easy-crop';
import getCroppedImg from "./cropImage";

const UploadID = ({ setIDImage, nextStep }) => {
    const [file, setFile] = useState(null);
    const [webcamOpen, setWebcamOpen] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        setFile(URL.createObjectURL(acceptedFiles[0]));
    }, []);

    const handleFileChange = (event) => {
        setFile(URL.createObjectURL(event.target.files[0]));
    };

    const handleCaptureClick = () => {
        setWebcamOpen(!webcamOpen);
    };

    const handleCapture = (imageSrc) => {
        setFile(imageSrc);
        setWebcamOpen(false);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const showCroppedImage = async () => {
        try {
            const croppedImage = await getCroppedImg(file, croppedAreaPixels, rotation);
            setFile(null);
            setIDImage(croppedImage);
            nextStep()
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={`cont-step ${webcamOpen ? "webcam-open" : ""}`}>
            <div className='headers-cont'>
                <h1>Carga tu documento</h1>
                <h2>Parte delantera</h2>
            </div>
            {!webcamOpen ?
                <div className='drag-drop-parent'>
                    <div className={file ? "w-100" : "drag-drop-container"} {...(!file ? getRootProps() : {})} >
                        <input {...getInputProps()} />
                        <input
                            id="fileInput"
                            type="file"
                            accept=".jpeg, .jpg, .png"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <div className="upload-area">


                            {file ? (
                                <div className='cropper-cont'>
                                    <Cropper
                                        image={file}
                                        crop={crop}
                                        rotation={rotation}
                                        zoom={zoom}
                                        aspect={8 / 5}
                                        onCropChange={setCrop}
                                        onRotationChange={setRotation}
                                        onCropComplete={onCropComplete}
                                        onZoomChange={setZoom}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <img src="/img/card.svg" width="129px" height="114px" alt='' />
                                    <p>Suelta tu documento aquí </p>
                                    <span>– O –</span>
                                    <p>Buscar documento</p>
                                    <span>– O –</span>
                                </div>
                            )}
                        </div>
                    </div>
                    {!file && (
                        <button className='s-blue-btn' onClick={handleCaptureClick}>
                            <img src="/img/camara.svg" alt='' width="28px" height="27px" /> Usar Camara
                        </button>
                    )}


                    {!file && (
                        <p>JPEG o PNG solamente |  3MB max</p>
                    )}
                    {file && (
                        <button className='l-blue-btn' onClick={showCroppedImage}>
                            <img src="/img/upload.svg" alt='' width="38px" height="38px" />Confirmar
                        </button>
                    )}
                </div>
                :
                <WebcamCapture onCapture={handleCapture} />
            }
        </div>
    );
};

const WebcamCapture = ({ onCapture }) => {
    const webcamRef = useRef(null);
    const [facingMode, setFacingMode] = useState('environment');

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            const hasBackCamera = devices.some(
                (device) => device.kind === 'videoinput' && device.label.toLowerCase().includes('back')
            );
            if (!hasBackCamera) {
                setFacingMode('user');
            }
        });
    }, []);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc);
    }, [webcamRef, onCapture]);

    return (
        <div className="webcam-container">
            <div className='card-webcam-cont'>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    mirrored={facingMode === "environment" ? false : true}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode, aspectRatio: 4 / 3 }}
                    className="webcam"
                />
                <div className="card-shape"></div>
            </div>

            <button className='l-blue-btn' onClick={capture}>
                <img src="/img/camara.svg" alt='' width="28px" height="27px" />Tomar foto
            </button>
        </div>

    );

};

export default UploadID;
