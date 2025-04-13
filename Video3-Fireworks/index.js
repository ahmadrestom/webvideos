
const container = document.getElementById('fireworks');
const colors = [
    { main: '#FF5252', secondary: '#FF8A80' },
    { main: '#FFEB3B', secondary: '#FFFF8D' },
    { main: '#4CAF50', secondary: '#A5D6A7' },
    { main: '#2196F3', secondary: '#90CAF9' },
    { main: '#9C27B0', secondary: '#CE93D8' }
];

function launchFirework() {
    const rocket = document.createElement('div');
    rocket.className = 'rocket';
    container.appendChild(rocket);
    setTimeout(() => {
        createExplosion();
        rocket.remove();
    }, 1500);
}

function createExplosion() {
    const colorSet = colors[Math.floor(Math.random() * colors.length)];
    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosion.style.background = colorSet.main;
    explosion.style.boxShadow = `0 0 30px 10px ${colorSet.main}`;
    container.appendChild(explosion);
    const glow = document.createElement('div');
    glow.className = 'glow';
    glow.style.background = `radial-gradient(circle, ${colorSet.main}20, transparent 70%)`;
    container.appendChild(glow);
    createParticles(colorSet);
    const smoke = document.createElement('div');
    smoke.className = 'smoke';
    container.appendChild(smoke);
    setTimeout(() => {
        explosion.remove();
        glow.remove();
        smoke.remove();
    }, 3000);
}

function createParticles(colorSet) {
    const particleCount = 80;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.3;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';


        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;


        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random();
        const distance = 50 + Math.random() * 150;
        const size = 3 + Math.random() * 4;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;


        const colorMix = Math.random() > 0.7 ? colorSet.secondary : colorSet.main;
        particle.style.background = colorMix;
        particle.style.boxShadow = `0 0 ${size * 3}px ${size / 2}px ${colorMix}`;


        const tx = Math.cos(angle) * distance * speed;
        const ty = Math.sin(angle) * distance * speed + (distance * 0.3);

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);


        particle.style.animationDelay = `${Math.random() * 0.2}s`;

        container.appendChild(particle);


        setTimeout(() => {
            particle.remove();
        }, 1200);
    }
}


function fireworkSequence() {
    launchFirework();


    setTimeout(() => {
        launchFirework();
    }, 200);

    setTimeout(() => {
        launchFirework();
    }, 400);
}


fireworkSequence();
setInterval(fireworkSequence, 2500);
