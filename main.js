const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("auth-form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (username.value === "Jona" && password.value === "password") {
		window.location.href = "/canvas";
		console.log("logged in");
	} else {
		username.value = "";
		password.value = "";
	}
});
