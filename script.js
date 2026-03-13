document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with the 'fade-in' class
    const faders = document.querySelectorAll('.fade-in');

    // Options for the IntersectionObserver
    const appearOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it comes into view
    };

    // Create the IntersectionObserver
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Do nothing if not intersecting
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, appearOptions);

    // Observe each element
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Theme Toggle Logic (Default is now Dark Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light-mode') {
        body.classList.add('light-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Save the current preference to localStorage
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode');
        } else {
            localStorage.setItem('theme', ''); // Default is dark
        }
    });
});
