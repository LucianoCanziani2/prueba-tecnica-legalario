
import React, { useEffect, useState } from 'react';

const VerifyIdentity = ({ idImage, selfie, faceapi, modelsLoaded, setModelsLoaded }) => {
    const [verificationResult, setVerificationResult] = useState(false);
    const [percentage, setPercentage] = useState(null);


    useEffect(() => {
        const verifyIdentity = async () => {
            try {
                const [idImageElement, selfieImageElement] = await Promise.all([
                    faceapi.fetchImage(idImage),
                    faceapi.fetchImage(selfie)
                ]);
                console.log("1/4 - Fetch de las imagenes a los modelos realizado");

                const idDetectionPromise = faceapi.detectSingleFace(idImageElement).withFaceLandmarks().withFaceDescriptor();
                const selfieDetectionPromise = faceapi.detectSingleFace(selfieImageElement).withFaceLandmarks().withFaceDescriptor();

                const [idDetections, selfieDetections] = await Promise.all([
                    idDetectionPromise,
                    selfieDetectionPromise
                ]);
                console.log("2/4 - Caras y landmarks detectados");

                if (idDetections && selfieDetections) {
                    const distance = faceapi.euclideanDistance(
                        idDetections.descriptor,
                        selfieDetections.descriptor
                    );
                    console.log("3/4 - Similitud entre imagenes calculada");
                    const similarityPercentage = ((1 - distance / 1.0) * 100).toFixed(2);

                    console.log("4/4 - " + (distance < 0.6 ? "Similitud encontrada!" : "Similitud no encontrada") + " el porcentaje fue de " + similarityPercentage + "%");
                    setPercentage(similarityPercentage);

                    setVerificationResult(distance < 0.6);
                } else {
                    console.log("No se detectaron caras en una o ambas imágenes");
                    setVerificationResult(false);
                    setPercentage(true);
                }
            } catch (error) {
                console.error('Error:', error);
                setVerificationResult(false);
                setPercentage(true);
            }
        };


        if (modelsLoaded && idImage && selfie) {
            verifyIdentity();
            setModelsLoaded(false)
        }
    }, []);

    const goHome = () => {
        window.location.href = "/";
    };
    return (
        <div className='cont-step'>
            {/* CARGANDO */}
            {
                !verificationResult && !percentage &&
                <div>
                    <div className='headers-cont'>
                        <h1>Estamos validando tu identidad</h1>
                        <h2>Esto puede demorar unos segundos</h2>
                    </div>
                    <div className='icon-cont'>
                        <img src="/img/spinner.png" className='spinner' width="246px" height="246px" alt='' />
                    </div>
                </div>
            }
            {/* AFIRMATIVO */}
            {
                verificationResult && percentage &&
                <div>
                    <div className='headers-cont'>
                        <h1>Identidad validada correctamente</h1>
                        <h2>Tu documento ya se encuentra verificado</h2>
                    </div>
                    <div className='icon-cont'>
                        <img src="/img/check.svg" width="256px" height="256px" alt='' />
                    </div>
                    <button className='l-blue-btn light' onClick={goHome}>
                        <img src="/img/home.svg" alt='' width="27px" height="25px" /> Finalizar
                    </button>
                </div>
            }
            {/* NEGATIVO */}
            {
                !verificationResult && percentage &&
                <div>
                    <div className='headers-cont'>
                        <h1>No pudimos validar tu identidad</h1>
                        <h2>Intenta tomándote una nueva selfie</h2>
                    </div>
                    <div className='icon-cont'>
                        <img src="/img/card-error.svg" width="223px" height="216px" alt='' />
                    </div>
                    <button className='l-blue-btn light' onClick={goHome}>
                        <img src="/img/refresh.svg" alt='' width="27px" height="25px" /> Reintentar
                    </button>
                    <p className='need-help w-100'>Necesito ayuda</p>
                </div>
            }
        </div>
    );
};

export default VerifyIdentity;
