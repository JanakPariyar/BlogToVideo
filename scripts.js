document.addEventListener("DOMContentLoaded", () => {

    if (window.innerWidth < 768) {
        // Show less text on mobile devices
        const text1 = document.getElementById('about-text-1');
        const text2 = document.getElementById('about-text-2');

        text1.innerHTML = 'I am a meticulous Data Analyst with a passion for uncovering insights from complex datasets. My expertise lies in transforming raw data into actionable insights.';
        text2.style.display = 'none';
    }

    // Particle effect
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded - callback');
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            } else {
                revealElements[i].classList.remove('active');
            }
        }
    };

    const dynamicText = document.querySelector(".static-text span");
    const words = ["Janak Pariyar", "not a robot", "data analyst", "humerosorous"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        dynamicText.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            // Typing the word
            charIndex++;
            setTimeout(typeEffect, 200);
        } else if (!isDeleting && charIndex === currentWord.length) {
            // Pause before deleting the word
            setTimeout(() => {
                isDeleting = true;
                typeEffect();
            }, 1000); // Pause duration
        } else if (isDeleting && charIndex > 0) {
            // Deleting the word
            charIndex--;
            setTimeout(typeEffect, 100);
        } else {
            // Toggle isDeleting when a word is fully typed or deleted
            isDeleting = !isDeleting;

            // If not deleting, move to the next word after a delay
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, 1000);
            } else {
                // Continue deleting immediately
                setTimeout(typeEffect, 100);
            }
        }
    };

    typeEffect();

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // Form submission with AJAX
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://formspree.io/f/xwkgzydk', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                form.reset();
                alert('Thank you for your message!');
            } else {
                alert('There was a problem submitting your form. Please try again.');
            }
        } catch (error) {
            alert('There was an error submitting your form. Please try again later.');
        }
    });
});
