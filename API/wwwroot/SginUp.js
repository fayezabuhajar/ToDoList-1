$(document).ready(function() {

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

    $('#registerForm').submit(function(event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        // التحقق من مطابقة كلمة المرور
        if ($('#password').val() !== $('#confirmPassword').val()) {
            alert('Passwords do not match!');
            return;
        }

        // جمع البيانات من النموذج
        var userData = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val()
        };

        console.log('Data to send:', userData);

        // إرسال البيانات باستخدام AJAX
        $.ajax({
            url: 'https://localhost:5001/api/Account/register', // استبدل بالرابط الصحيح
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(response) {
                console.log('Response:', response);
                window.location.href = 'dashboard.html';
            },
            error: function(xhr, status, error) {
                console.error('XHR:', xhr);
                console.error('Status:', status);
                console.error('Error:', error);
                alert(`Error occurred: ${status} - ${error}`);
            }
            
        });
    });
});
