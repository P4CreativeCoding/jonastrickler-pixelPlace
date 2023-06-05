const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("auth-form");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	fetch("https://pixelplace.adaptable.app/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username: username.value,
			password: password.value,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			if (data.valid === true) {
				window.location.href = "/canvas";
			} else if (data.valid === false) {
				username.value = "";
				password.value = "";
			}
		});
});
