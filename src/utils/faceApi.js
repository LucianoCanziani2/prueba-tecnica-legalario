// src/utils/faceApi.js

import * as faceapi from 'face-api.js';

export const loadModels = async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
};

export const getFaceDescriptor = async (image) => {
    const img = await faceapi.fetchImage(image);
    return await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
};
