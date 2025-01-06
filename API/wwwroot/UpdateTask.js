$(document).ready(function () {
    // تحديث التاريخ تلقائيًا
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

    // استرداد معرف المهمة من localStorage
    var taskId = localStorage.getItem('editTaskId');
    console.log('Editing Task ID:', taskId);

    // تعبئة النموذج بالبيانات الحالية (اختياري إذا كانت API توفر بيانات المهمة)
    $.ajax({
        url: `https://localhost:5001/api/Task/${taskId}`,
        type: 'GET',
        success: function (task) {
            $('#title').val(task.title);
            $('#date').val(task.date);
            $('#description').val(task.description);
        },
        error: function (err) {
            console.error('Error loading task:', err);
        }
    });

    // تعديل المهمة عند النقر على زر الحفظ
    $('#submitBtn').click(function () {
        // جمع البيانات من النموذج
        var taskData = {
            id: taskId, // استخدام معرف المهمة
            title: $('#title').val(),
            date: $('#date').val(),
            description: $('#description').val(),
            status: 'New' // يمكنك التحديث بحالة جديدة إذا لزم الأمر
        };

        console.log('Data to send:', taskData);

        // إرسال البيانات باستخدام AJAX
        $.ajax({
            url: `https://localhost:5001/api/Task/${taskId}`, // استبدل بالرابط الصحيح
            type: 'PUT', // تغيير الطريقة إلى PUT
            contentType: 'application/json',
            data: JSON.stringify(taskData),
            success: function (response) {
                alert('Task updated successfully!');
                console.log('Response:', response);

                // إعادة التوجيه بعد التعديل (اختياري)
                window.location.href = 'TaskCategories.html';
            },
            error: function (xhr, status, error) {
                console.error('Error:', xhr.responseText || error);
                alert('An error occurred: ' + (xhr.responseText || error));
            }
        });
    });
});
