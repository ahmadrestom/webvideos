
const card = document.getElementById('card');
card.addEventListener('mouseenter', () => {
    card.classList.add('flipped');
});

card.addEventListener('mouseleave', () => {
    card.classList.remove('flipped');
});
