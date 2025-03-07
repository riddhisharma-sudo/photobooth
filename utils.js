// utils.js

export function downloadImage(canvasElement, filename = 'photo-booth.png') {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvasElement.toDataURL('image/png');
    link.click();
}

export function resizeCanvas(canvasElement, width, height) {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = width;
    tempCanvas.height = height;
    tempCtx.drawImage(canvasElement, 0, 0, width, height);
    
    canvasElement.width = width;
    canvasElement.height = height;
    const ctx = canvasElement.getContext('2d');
    ctx.drawImage(tempCanvas, 0, 0);
}

export function toggleFullscreen(element) {
    if (!document.fullscreenElement) {
        element.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}
