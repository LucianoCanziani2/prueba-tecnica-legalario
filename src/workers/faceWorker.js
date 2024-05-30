// src/workers/faceWorker.js

/* eslint-disable no-restricted-globals */
import * as faceapi from 'face-api.js';

// Explicitly set environment to BROWSER
faceapi.env.setEnv(faceapi.env.createBrowserEnv());

self.onmessage = async (event) => {
    const { idImage, selfie } = event.data;

    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

    const getFaceDescriptor = async (image) => {
        const img = await faceapi.fetchImage(image);
        return await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
    };

    const idDetections = await getFaceDescriptor(idImage);
    const selfieDetections = await getFaceDescriptor(selfie);

    if (idDetections && selfieDetections) {
        const distance = faceapi.euclideanDistance(
            idDetections.descriptor,
            selfieDetections.descriptor
        );
        self.postMessage({
            result: distance < 0.6 ? 'Identity Confirmed' : 'Identity Not Confirmed',
        });
    } else {
        self.postMessage({ result: 'Face not detected in one or both images' });
    }
};
/* eslint-enable no-restricted-globals */
