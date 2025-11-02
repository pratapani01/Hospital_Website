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
// --- WhatsApp Form Submission Handler ---
document.addEventListener('DOMContentLoaded', () => {
    // ... (Your existing JavaScript code for Doctor Tabs and Accordion) ...

    const contactForm = document.getElementById('whatsapp-form');
    const whatsappNumber = '918700127481'; // The target number

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the default form submission

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Construct the WhatsApp message body
            const whatsappMessage = 
                `*New Inquiry from Medics Care Hospital Website*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Email:* ${email}%0A` +
                `*Subject:* ${subject}%0A%0A` +
                `*Message:* ${message}`;

            // Create the WhatsApp link
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

            // Redirect the user
            window.open(whatsappURL, '_blank');
            
            // Optionally clear the form after opening WhatsApp
            contactForm.reset(); 

            alert('Your message is ready! Please send the pre-filled message via WhatsApp.');
        });
    }
});