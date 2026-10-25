
const cards = document.querySelectorAll(".gallery-card");

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            galleryObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

cards.forEach((card, index) => {
    card.style.transitionDelay = `${(index % 3) * 0.12}s`;
    galleryObserver.observe(card);
});
