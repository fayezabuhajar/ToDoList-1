$(document).ready(function() {
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
    });
    
   

    $('#submitBtn').click(function() {
        // جمع البيانات من النموذج
        var taskData = {
            title: $('#title').val(),
            date: $('#date').val(),
           
            description: $('#description').val(),
            status: 'New'
        };

        console.log('Data to send:', taskData);

        // إرسال البيانات باستخدام AJAX
        $.ajax({
            url: 'https://localhost:5001/api/Task', // استبدل بالرابط الصحيح
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(taskData),
            success: function(response) {
                alert('Task submitted successfully!');
                console.log('Response:', response);
            },
            error: function(xhr, status, error) {
                console.error('Error:', xhr.responseText || error);
                alert('An error occurred: ' + (xhr.responseText || error));
            }
        });
    });
});
