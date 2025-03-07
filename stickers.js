// stickers.js
export function addSticker(canvasElement, stickerSrc, x = 50, y = 50, width = 100, height = 100) {
    const ctx = canvasElement.getContext('2d');
    const img = new Image();
    img.src = stickerSrc;
    img.onload = () => ctx.drawImage(img, x, y, width, height);
}

export function addDraggableSticker(canvasElement, stickerSrc) {
    const ctx = canvasElement.getContext('2d');
    const img = new Image();
    img.src = stickerSrc;
    let isDragging = false;
    let stickerX = 50, stickerY = 50, stickerWidth = 100, stickerHeight = 100;

    img.onload = () => {
        ctx.drawImage(img, stickerX, stickerY, stickerWidth, stickerHeight);
    };

    canvasElement.addEventListener('mousedown', (e) => {
        const rect = canvasElement.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (
            mouseX >= stickerX &&
            mouseX <= stickerX + stickerWidth &&
            mouseY >= stickerY &&
            mouseY <= stickerY + stickerHeight
        ) {
            isDragging = true;
        }
    });

    canvasElement.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const rect = canvasElement.getBoundingClientRect();
            stickerX = e.clientX - rect.left - stickerWidth / 2;
            stickerY = e.clientY - rect.top - stickerHeight / 2;
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            ctx.drawImage(img, stickerX, stickerY, stickerWidth, stickerHeight);
        }
    });

    canvasElement.addEventListener('mouseup', () => {
        isDragging = false;
    });
}
