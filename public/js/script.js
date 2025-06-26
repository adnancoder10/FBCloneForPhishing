document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  form.addEventListener("submit", (e) => {

    let isValid = true;

    // Reset styles and errors
    email.classList.remove("invalid");
    password.classList.remove("invalid");
    emailError.textContent = "";
    passwordError.textContent = "";

    if (email.value.trim() === "") {
      email.classList.add("invalid");
      emailError.textContent = "Email or phone number is required.";
      isValid = false;
    }

    if (password.value.trim() === "") {
      password.classList.add("invalid");
      passwordError.textContent = "Password is required.";
      isValid = false;
    }

    if (!isValid) {
      // Submit or simulate submission
      console.log("Valid Login:", email.value, password.value);
      e.preventDefault();

      // alert("Logging in...");
    }
  });
});
