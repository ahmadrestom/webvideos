const nucleus = document.getElementById('nucleus');
const protonCount = 14;
const neutronCount = 14;
for (let i = 0; i < protonCount; i++) {
    createNucleon('proton', nucleus);
}
for (let i = 0; i < neutronCount; i++) {
    createNucleon('neutron', nucleus);
}

function createNucleon(type, container) {
    const nucleon = document.createElement('div');
    nucleon.className = `nucleon ${type}`;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = Math.random() * 40;

    const x = Math.sin(phi) * Math.cos(theta) * r;
    const y = Math.sin(phi) * Math.sin(theta) * r;

    nucleon.style.left = `${x + 60}px`;
    nucleon.style.top = `${y + 60}px`;
    nucleon.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(nucleon);
}