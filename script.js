emailjs.init("i9cCFwggpMM-VLMKW");

let isSubmitting = false;

document.getElementById('pollutionForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    if (isSubmitting) return;

    isSubmitting = true;
    const btn = this.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = "Sending...";

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        mobile: document.getElementById('mobile').value,
        location: document.getElementById('location').value,
        issueType: document.getElementById('issueType').value,
        description: document.getElementById('description').value,
        timestamp: new Date().toLocaleString()
    };

    try {
        await emailjs.send('service_eywet1s', 'template_hbekyv9', formData); // ADMIN EMAIL
        await new Promise(resolve => setTimeout(resolve, 1500)); // delay before reply
        await emailjs.send('service_eywet1s', 'template_9ewozzh', formData); // USER REPLY
        alert("Report submitted successfully!");
        document.getElementById('pollutionForm').reset();
    } catch (error) {
        alert("Error sending report. Please try again later.");
        console.error("EmailJS Error:", error);
    }

    btn.disabled = false;
    btn.textContent = "Submit Report";
    isSubmitting = false;
});