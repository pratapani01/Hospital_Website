document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const doctorCards = document.querySelectorAll('.doctor-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Update Active Tab State
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. Filter Doctors
            const specialty = button.getAttribute('data-specialty');

            doctorCards.forEach(card => {
                const cardSpecialty = card.getAttribute('data-specialty');
                
                // Show all if 'all' is clicked, otherwise check specialty match
                if (specialty === 'all' || specialty === cardSpecialty) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
// --- Accordion Functionality for Services Page ---
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        
        // Check if the current header is already active
        const isActive = header.classList.contains('active');

        // Close all other open sections (optional, but cleaner)
        accordionHeaders.forEach(h => {
            h.classList.remove('active');
            h.nextElementSibling.style.maxHeight = 0;
            h.nextElementSibling.style.padding = '0 25px'; // Reset padding when closing
        });

        // Toggle the clicked section
        if (!isActive) {
            header.classList.add('active');
            content.style.maxHeight = content.scrollHeight + 36 + 'px'; // +36 for top/bottom padding
            content.style.padding = '18px 25px'; // Apply desired padding when open
        }
    });
});