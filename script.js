const validCredentials = {
    email: "student@gmail.com",
    password: "password"
};

document.getElementById("login-btn").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === validCredentials.email && password === validCredentials.password) {
        alert("Login successful!");
        window.location.href = "landing-page.html";
    } else {
        alert("Incorrect email or password. Please try again.");
        window.location.href = "index.html";
    }
});
