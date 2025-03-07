// filters.js
export function applyFilter(canvasElement, filterType) {
    const ctx = canvasElement.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
    const data = imageData.data;

    switch (filterType) {
        case 'grayscale':
            for (let i = 0; i < data.length; i += 4) {
                let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                data[i] = data[i + 1] = data[i + 2] = avg;
            }
            break;
        case 'sepia':
            for (let i = 0; i < data.length; i += 4) {
                let r = data[i], g = data[i + 1], b = data[i + 2];
                data[i] = r * 0.393 + g * 0.769 + b * 0.189;
                data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168;
                data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131;
            }
            break;
        case 'invert':
            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
            break;
        case 'brightness':
            for (let i = 0; i < data.length; i += 4) {
                data[i] += 40;
                data[i + 1] += 40;
                data[i + 2] += 40;
            }
            break;
    }

    ctx.putImageData(imageData, 0, 0);
}

export function resetFilter(canvasElement) {
    const ctx = canvasElement.getContext('2d');
    ctx.filter = 'none';
    ctx.drawImage(canvasElement, 0, 0);
}
