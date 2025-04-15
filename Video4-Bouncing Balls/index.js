const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const balls = [];
const colors = ['#FF5252', '#FFD740', '#64FFDA', '#448AFF', '#B388FF'];
const gravity = 0.2;
const friction = 0.9;
const bounce = 0.7;
class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius || Math.random() * 20 + 10;
        this.dx = (Math.random() - 0.5) * 5;
        this.dy = (Math.random() - 0.5) * 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        
        this.dy += gravity;
        this.x += this.dx;
        this.y += this.dy;

    
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx * friction;
        }

        if (this.y + this.radius > canvas.height) {
            this.dy = -this.dy * bounce;
            this.y = canvas.height - this.radius;
        }

        if (this.y - this.radius < 0) {
            this.dy = -this.dy * bounce;
            this.y = this.radius;
        }

        this.draw();
    }
}
canvas.addEventListener('click', (e) => {
    const ball = new Ball(e.clientX, e.clientY);
    balls.push(ball);
});
clearBtn.addEventListener('click', () => {
    balls.length = 0;
});
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.update());
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const dx = balls[j].x - balls[i].x;
            const dy = balls[j].y - balls[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < balls[i].radius + balls[j].radius) {
                const angle = Math.atan2(dy, dx);
                const overlap = (balls[i].radius + balls[j].radius - distance) / 2;

                
                balls[i].x -= overlap * Math.cos(angle);
                balls[i].y -= overlap * Math.sin(angle);
                balls[j].x += overlap * Math.cos(angle);
                balls[j].y += overlap * Math.sin(angle);

                [balls[i].dx, balls[j].dx] = [balls[j].dx, balls[i].dx];
                [balls[i].dy, balls[j].dy] = [balls[j].dy, balls[i].dy];
            }
        }
    }
}
animate();
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});