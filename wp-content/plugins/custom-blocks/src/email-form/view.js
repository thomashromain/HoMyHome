document.addEventListener('submit', (e) => {
    if (e.target.classList.contains('modular-email-form')) {
        e.preventDefault();
        const form = e.target;
        const msgDiv = form.querySelector('.response-msg');

        // 1. VALIDATE FIRST
        if (!form.checkValidity()) {
            form.reportValidity();
            msgDiv.innerText = ''; // Clear "Sending..." if it was there
            return;
        }

        // 2. SET UI STATE
        msgDiv.innerText = 'Sending...';
        
        const inputs = form.querySelectorAll('.email-input');
        const payload = { header: {}, body: {} };

        // 3. BUILD PAYLOAD
        inputs.forEach(input => {
            const loc = input.dataset.location; 
            const title = input.dataset.title;
            payload[loc][title] = input.value;
        });

        // 4. FETCH
        fetch('/wp-json/custom/v1/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            msgDiv.innerText = data.success ? 'Sent successfully!' : 'Error sending.';
            if(data.success) form.reset(); // Optional: Clear form on success
        })
        .catch(err => {
            msgDiv.innerText = 'Server error. Please try again.';
        });
    }
});