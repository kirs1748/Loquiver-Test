document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('signup-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const email = event.target.email.value;
        const username = event.target.username.value;
        const password = event.target.password.value;

        console.log(email, username, password);

        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur lors de la requête :', error.message);
        });
    });
});