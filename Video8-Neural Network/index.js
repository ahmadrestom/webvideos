
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
canvas.width = size;
canvas.height = size;
const nodes = [];
const nodeCount = 14;
const center = { x: canvas.width / 2, y: canvas.height / 2 };
const orbRadius = size * 0.3;

for (let i = 0; i < nodeCount; i++) {
    nodes.push({
        x: center.x + (Math.random() * 2 - 1) * orbRadius * 0.7,
        y: center.y + (Math.random() * 2 - 1) * orbRadius * 0.7,
        size: Math.random() * 8 + 4,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(
        center.x, center.y, 0,
        center.x, center.y, orbRadius
    );
    gradient.addColorStop(0, 'rgba(0, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(center.x, center.y, orbRadius, 0, Math.PI * 2);
    ctx.fill();


    nodes.forEach(node => {
        node.x += node.speedX;
        node.y += node.speedY;
        const dx = node.x - center.x;
        const dy = node.y - center.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > orbRadius * 0.7) {
            node.speedX *= -0.8;
            node.speedY *= -0.8;
        }

        nodes.forEach(otherNode => {
            const distX = node.x - otherNode.x;
            const distY = node.y - otherNode.y;
            const dist = Math.sqrt(distX * distX + distY * distY);
            if (dist < orbRadius * 0.5) {
                ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 - dist / (orbRadius * 0.5) * 0.3})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(otherNode.x, otherNode.y);
                ctx.stroke();
            }
        });

        ctx.fillStyle = 'cyan';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        const nodeGlow = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.size * 3
        );
        nodeGlow.addColorStop(0, 'rgba(0, 255, 255, 0.4)');
        nodeGlow.addColorStop(1, 'rgba(0, 255, 255, 0)');
        ctx.fillStyle = nodeGlow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();