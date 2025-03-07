// camera.js
export async function startCamera(videoElement) {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoElement.srcObject = stream;
}

export function capturePhoto(videoElement, canvasElement) {
    const ctx = canvasElement.getContext('2d');
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
}

// filters.js
export function applyFilter(canvasElement, filterType) {
    const ctx = canvasElement.getContext('2d');
    ctx.filter = filterType;
    ctx.drawImage(canvasElement, 0, 0);
}

// stickers.js
export function addSticker(canvasElement, stickerImage) {
    const ctx = canvasElement.getContext('2d');
    const img = new Image();
    img.src = stickerImage;
    img.onload = () => ctx.drawImage(img, 50, 50, 100, 100);
}

// gifRecorder.js
export function recordGIF(videoElement) {
    // Implement GIF recording logic using GIF.js or similar library
}

// draw.js
export function enableDrawing(canvasElement) {
    let isDrawing = false;
    const ctx = canvasElement.getContext('2d');
    canvasElement.addEventListener('mousedown', () => isDrawing = true);
    canvasElement.addEventListener('mouseup', () => isDrawing = false);
    canvasElement.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
        }
    });
}

// main.js
import { startCamera, capturePhoto } from './camera.js';
import { applyFilter } from './filters.js';
import { addSticker } from './stickers.js';
import { enableDrawing } from './draw.js';

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureBtn = document.getElementById('capture');
    const filterBtn = document.getElementById('filter');
    const stickerBtn = document.getElementById('sticker');
    const drawBtn = document.getElementById('draw');
    
    startCamera(video);

    captureBtn.addEventListener('click', () => capturePhoto(video, canvas));
    filterBtn.addEventListener('click', () => applyFilter(canvas, 'grayscale(100%)'));
    stickerBtn.addEventListener('click', () => addSticker(canvas, 'sticker.png'));
    drawBtn.addEventListener('click', () => enableDrawing(canvas));
});
