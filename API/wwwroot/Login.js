$(document).ready(function () {

    var today = new Date();
    var options = {
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    var formattedDate = today.toLocaleDateString('en-US', options);
    var dateParts = formattedDate.split(", ");
    $('.date span:first-child').text(dateParts[0]);
    $('.date span:last-child').text(dateParts[1]);

    $('#loginForm').submit(function (event) {
        event.preventDefault();

        const loginData = {
            username: $('#username').val(),
            password: $('#password').val(),
        };

        console.log('Sending login data:', loginData);

        $.ajax({
            url: 'https://localhost:5001/api/Account/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(loginData),
            success: function (response) {
                console.log('Response:', response);
                window.location.href = 'dashboard.html';
            },
            error: function (xhr, status, error) {
                alert('Login failed: ' + (xhr.responseText || 'Unknown error'));
                console.error('Error:', error);
            },
        });
    });
});
