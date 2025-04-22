document.getElementById("login-btn").addEventListener("click", function () {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Admin credentials
    if (email === "admin@gmail.com" && password === "password") {
        alert("Admin login successful!");
        window.location.href = "admin-page.html";
        return;
    }

    // Student credentials
    if (email === "student@gmail.com" && password === "password") {
        alert("Student login successful!");
        window.location.href = "landing-page.html";
        return;
    }

    // If neither match
    alert("Incorrect email or password. Please try again.");
});
