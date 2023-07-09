// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });

        // Add active class to the clicked navigation link
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Add scroll event listener to highlight active navigation link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    // Remove active class from all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the current section's navigation link
    const activeLink = document.querySelector(`a[href^="#${currentSection}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
});

// Image slide-in animation
const images = document.querySelectorAll('#images img');
const captionElements = document.querySelectorAll('.caption');

function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function slideImages() {
    images.forEach(image => {
        const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
        const imageBottom = image.offsetTop + image.height;
        const isHalfShown = slideInAt > image.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;

        if (isHalfShown && isNotScrolledPast) {
            image.classList.add('active');
        } else {
            image.classList.remove('active');
        }
    });
}

function slideCaptions() {
    captionElements.forEach(caption => {
        const slideInAt = (window.scrollY + window.innerHeight) - caption.offsetHeight / 2;
        const captionTop = caption.offsetTop;
        const captionBottom = caption.offsetTop + caption.offsetHeight;
        const isHalfShown = slideInAt > captionTop;
        const isNotScrolledPast = window.scrollY < captionBottom;

        if (isHalfShown && isNotScrolledPast) {
            caption.classList.add('active');
        } else {
            caption.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', debounce(slideImages));
window.addEventListener('scroll', debounce(slideCaptions));
