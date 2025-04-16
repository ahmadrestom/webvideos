const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const tree = {
    startLength: 120,
    minLength: 2,
    angle: Math.PI / 8,
    branchShrink: 0.7,
    growthSpeed: 0.0005,
    colorChangeSpeed: 0.01
};
function drawTree(x, y, length, angle, depth, time) {
    if (length < tree.minLength) return;

    const endX = x + Math.cos(angle) * length;
    const endY = y + Math.sin(angle) * length;
    const growth = Math.min(1, time * tree.growthSpeed / depth);
    const currentLength = length * growth;
    const currentEndX = x + Math.cos(angle) * currentLength;
    const currentEndY = y + Math.sin(angle) * currentLength;
    const hue = (time * tree.colorChangeSpeed + depth * 10) % 360;
    ctx.strokeStyle = `hsl(${hue}, 80%, ${50 - depth * 3}%)`;
    ctx.lineWidth = depth;
    
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(currentEndX, currentEndY);
    ctx.stroke();
    const sway = Math.sin(time * 0.002 + depth) * 0.1;
    if (growth > 0.8) {
        drawTree(
            currentEndX, 
            currentEndY, 
            length * tree.branchShrink, 
            angle - tree.angle + sway, 
            depth + 1, 
            time
        );
        drawTree(
            currentEndX, 
            currentEndY, 
            length * tree.branchShrink, 
            angle + tree.angle + sway, 
            depth + 1, 
            time
        );
    }
}
function animate(time) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const treeCount = 3;
    for (let i = 0; i < treeCount; i++) {
        const x = canvas.width * (0.2 + i * 0.3);
        drawTree(
            x, 
            canvas.height, 
            tree.startLength, 
            -Math.PI/2, 
            1, 
            time + i * 1000
        );
    }

    requestAnimationFrame(animate);
}

animate();


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});