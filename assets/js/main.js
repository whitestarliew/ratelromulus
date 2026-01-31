document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Simple accessible toggle for mobile
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Toggle display style for the CSS to pick up if utilizing the .nav-active class logic from CSS
            // Actually my CSS used .nav-active on a parent or .active on nav-links?
            // checking CSS: .nav-active .nav-links
            // Let's toggle the class on the nav tag or header to be safe, or adjust logic.
            // CSS said: .nav-active .nav-links { display: flex... }
            // So I should toggle .nav-active on the parent element of nav-links, which is likely 'nav' or 'header'.
            menuToggle.parentElement.classList.toggle('nav-active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
