document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const inputEmailOrPhone = document.querySelector("#emailOrPhone");
    const inputPassword = document.querySelector("#password");
    const emailOrPhoneErrorDisplay = document.querySelector("#emailOrPhoneErrorDisplay");
    const passwordErrorDisplay = document.querySelector("#passwordErrorDisplay");

    form.addEventListener("submit", function (e) {
        let isValid = true

        const emailPattern = /^[a-zA-Z0-9]+([._%+-][a-zA-Z0-9]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/

        const phonePattern = /^\d{10,15}$/;

        // Check if the input is empty
        if (inputEmailOrPhone.value.trim() === "") {
            isValid = false;
            emailOrPhoneErrorDisplay.textContent = "Email or phone number cannot be empty."

        }else if (!emailPattern.test(inputEmailOrPhone.value) && !phonePattern.test(inputEmailOrPhone.value)) {
            isValid = false;
            emailOrPhoneErrorDisplay.textContent = "Please enter a valid email or phone number (10-15 digits)."
        }else{
            emailOrPhoneErrorDisplay.textContent = ""

        }


        if (inputPassword.value.length < 6) {
            isValid = false;
            passwordErrorDisplay.textContent = "Your password must be at least 6 characters long."
        }else{
            passwordErrorDisplay.textContent = ""

        }

        if (!isValid) {
            e.preventDefault()

        }


    });
});
