// ai-filters.js
import * as tf from '@tensorflow/tfjs';
import * as bodyPix from '@tensorflow-models/body-pix';

export async function applyAIFilter(canvasElement, filterType) {
    const ctx = canvasElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
    const net = await bodyPix.load();
    const segmentation = await net.segmentPerson(imageData);

    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        if (segmentation.data[i / 4] === 0) { // Background pixels
            switch (filterType) {
                case 'blur':
                    data[i] = data[i + 1] = data[i + 2] = 180; // Blur effect
                    break;
                case 'cartoon':
                    data[i] = (data[i] / 2) * 2;
                    data[i + 1] = (data[i + 1] / 2) * 2;
                    data[i + 2] = (data[i + 2] / 2) * 2;
                    break;
                case 'outline':
                    data[i] = data[i + 1] = data[i + 2] = 255; // White outline
                    break;
            }
        }
    }

    ctx.putImageData(imageData, 0, 0);
}
