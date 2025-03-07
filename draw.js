// draw.js
export function enableDrawing(canvasElement) {
    const ctx = canvasElement.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    canvasElement.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvasElement.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvasElement.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvasElement.addEventListener('mouseleave', () => {
        isDrawing = false;
    });
}

export function changeBrushColor(canvasElement, color) {
    const ctx = canvasElement.getContext('2d');
    ctx.strokeStyle = color;
}

export function clearCanvas(canvasElement) {
    const ctx = canvasElement.getContext('2d');
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
}
