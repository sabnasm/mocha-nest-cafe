
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const formStatus = document.getElementById("formStatus");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formStatus.textContent = "";

    let isValid = true;

    if (name.length < 2) {
        nameError.textContent = "Please enter at least 2 characters.";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid-looking email.";
        isValid = false;
    }

    if (message.length < 10) {
        messageError.textContent = "Your message must be at least 10 characters.";
        isValid = false;
    }

    if (!isValid) {
        formStatus.textContent = "Please fix the errors above.";
        return;
    }

    formStatus.textContent =
        "Looks good! This demo doesn't actually send messages yet.";

    form.reset();
});
