# Prueba Técnica Legalario

## Descripción del Proyecto
Este proyecto consiste en una aplicación web desarrollada en React que permite a los usuarios cargar un documento de identidad, tomar una fotografía con la cámara web del dispositivo, visualizar y recortar las imágenes, y comparar ambas utilizando los modelos de la libreria `face-api.js` para verificar si son la misma persona.

Puede ver el proceso del ultimo a traves de console logs.

La ultima parte en la que verifica la identidad puede tardar un tiempo largo, lo hubiese hecho en el back o desarrollado una API aparte, pero la prueba tecnica es Front-End, por lo que me limite a trabajar dentro de esos parametro. Alivie la carga separando la iniciacion de modelos al iniciar la web y su accion luego.

## Funcionalidades
1. **Carga de Documento**: Permite al usuario arrastrar y soltar o hacer clic para subir un documento en formato PNG o JPEG.
2. **Toma de Fotografía**: Accede a la cámara web del dispositivo para capturar una fotografía.
3. **Vista Previa y Recorte**: Muestra una vista previa del documento cargado o la fotografía tomada y permite recortarlos para ajustarse a un aspecto ratio.
4. **Toma de Selfie**: Solicita al usuario una selfie para compararla con el documento cargado.
5. **Comparación de Imágenes**: Utiliza `face-api.js` para comparar las dos imágenes y determinar si pertenecen a la misma persona.

## Requerimientos Funcionales
- Solicitar un archivo en formato PNG o JPEG.
- Acceder a la cámara web del dispositivo del usuario.
- Mostrar una vista previa del documento cargado o de la fotografía tomada.
- Conectar las etapas secuencialmente: seleccionar un documento, cargar el documento, mostrar vista previa, etc.

## Requerimientos No Funcionales
- Interfaces responsivas.
- Compatibilidad con los navegadores más usados: Google Chrome, Safari, IE Edge, y Mozilla Firefox en sus versiones más recientes.
- Evaluación en dispositivos móviles en orientación “Landscape” y “Viewpoint”.
- Entrega de la solución en un lapso no mayor a 12 horas.

## Tecnologías Utilizadas
- React ^18.3.1
- `react-dropzone` ^14.2.3 para la carga de archivos mediante drag-and-drop.
- `react-webcam` ^7.2.0 para la captura de fotografías desde la cámara web.
- `react-easy-crop` ^5.0.7 para el recorte de imágenes.
- `face-api.js` ^0.22.2 para la comparación de rostros.
