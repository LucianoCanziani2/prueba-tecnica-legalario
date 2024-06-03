import React, { useState, useEffect } from 'react';
import UploadID from './components/UploadID';
import SelfieCapture from './components/SelfieCapture';
import VerifyIdentity from './components/VerifyIdentity';
import './App.css';
import * as faceapi from 'face-api.js';

const App = () => {
  const [idImage, setIDImage] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ]);
        setModelsLoaded(true);
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };
    loadModels();
  }, []);

  return (
    <div className="App">
      <nav>
        <img src="/img/legalario-logo.png" alt='' />
      </nav>


      {step === 1 &&
        <UploadID
          setIDImage={setIDImage}
          nextStep={nextStep}
        />}
      {step === 2 &&
        <SelfieCapture
          setSelfie={setSelfie}
          selfie={selfie}
          nextStep={nextStep}
        />}
      {step === 3 &&
        <VerifyIdentity
          idImage={idImage}
          selfie={selfie}
          faceapi={faceapi}
          modelsLoaded={modelsLoaded}
          setModelsLoaded={setModelsLoaded}
        />}
      <div className="screen-background-half"></div>
    </div>
  );
};

export default App;
