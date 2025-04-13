const stars = document.querySelector('.stars');
const starCount = 1000;

for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    

    const opacity = Math.random() * 0.8 + 0.2;
    star.style.opacity = opacity;
    
    const duration = Math.random() * 5 + 5;
    const delay = Math.random() * 10;
    star.style.animation = `twinkle ${duration}s infinite ${delay}s`;
    
    const colorVariation = Math.random();
    if (colorVariation > 0.9) {
        star.style.backgroundColor = `rgb(200, 200, ${Math.random() * 55 + 200})`;
    } else if (colorVariation > 0.8) {
        star.style.backgroundColor = `rgb(${Math.random() * 55 + 200}, 200, 200)`;
    } else {
        star.style.backgroundColor = 'white';
    }
    
    stars.appendChild(star);
}
const style = document.createElement('style');
style.textContent = `
    .star {
        position: absolute;
        background: white;
        border-radius: 50%;
        animation-timing-function: ease-in-out;
        will-change: opacity;
    }
    @keyframes twinkle {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);
const asteroidBelt = document.querySelector('.asteroid-belt');
const asteroidCount = 50;

for (let i = 0; i < asteroidCount; i++) {
    const asteroid = document.createElement('div');
    asteroid.className = 'asteroid';
    
    const size = Math.random() * 3 + 1;
    asteroid.style.width = `${size}px`;
    asteroid.style.height = `${size}px`;
    const angle = Math.random() * 360;
    const distance = Math.random() * 100 + 300;
    const x = Math.cos(angle * Math.PI / 180) * distance;
    const y = Math.sin(angle * Math.PI / 180) * distance * 0.8;
    
    asteroid.style.left = `calc(50% + ${x}px)`;
    asteroid.style.top = `calc(50% + ${y}px)`;
    const brownValue = Math.random() * 100 + 100;
    asteroid.style.backgroundColor = `rgb(${brownValue}, ${brownValue * 0.7}, ${brownValue * 0.5})`;
    
    const orbitDuration = Math.random() * 20000 + 10000; 
    asteroid.style.animation = `asteroid-orbit ${orbitDuration}ms linear infinite`;
    asteroid.style.transformOrigin = `-${x}px -${y}px 0`;
    
    asteroidBelt.appendChild(asteroid);
}
const asteroidStyle = document.createElement('style');
asteroidStyle.textContent = `
    .asteroid {
        position: absolute;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        will-change: transform;
    }
    @keyframes asteroid-orbit {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(asteroidStyle);
document.getElementById('speed-up').addEventListener('click', () => {
    const orbits = document.querySelectorAll('.planet-orbit, .moon-orbit, .asteroid');
    orbits.forEach(orbit => {
        const currentDuration = window.getComputedStyle(orbit).animationDuration;
        const newDuration = parseFloat(currentDuration) / 10;
        orbit.style.animationDuration = `${newDuration}s`;
    });
});

document.getElementById('reset-speed').addEventListener('click', () => {
    const orbits = document.querySelectorAll('.planet-orbit, .moon-orbit, .asteroid');
    orbits.forEach(orbit => {
        orbit.style.animationDuration = '';
    });
});

document.getElementById('toggle-orbits').addEventListener('click', () => {
    const orbits = document.querySelectorAll('.planet-orbit, .moon-orbit, .asteroid-belt');
    orbits.forEach(orbit => {
        orbit.style.display = orbit.style.display === 'none' ? '' : 'none';
    });
});
const planets = {
    mercury: 'Mercury',
    venus: 'Venus',
    earth: 'Earth',
    mars: 'Mars',
    jupiter: 'Jupiter',
    saturn: 'Saturn',
    uranus: 'Uranus',
    neptune: 'Neptune',
    pluto: 'Pluto'
};

Object.keys(planets).forEach(planetName => {
    const planet = document.querySelector(`.${planetName}`);
    if (planet) {
        planet.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = planets[planetName];
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '4px 8px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.transform = 'translate(-50%, -30px)';
            planet.appendChild(tooltip);
        });
        
        planet.addEventListener('mouseleave', () => {
            const tooltip = planet.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    }
});