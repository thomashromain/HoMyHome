document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.wp-block-image-slider-visual');
    
    sliders.forEach(slider => {
        const input = slider.querySelector('.slider-input');
        input.addEventListener('input', (e) => {
            slider.style.setProperty('--position', `${e.target.value}%`);
        });
    });
});