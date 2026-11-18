<?php
session_start();

// إعدادات الاتصال بقاعدة البيانات
$host = "localhost";
$username = "root";
$password = "";
$dbname = "alrayan_school";

$conn = new mysqli($host, $username, $password, $dbname);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $studentId = trim($_POST['studentId'] ?? '');
    $passInput = $_POST['password'] ?? '';

    // البحث عن الطالب برقم الهوية باستخدام Prepared Statements لمنع الثغرات
    $stmt = $conn->prepare("SELECT id, student_name, password FROM students WHERE student_id = ?");
    $stmt->bind_param("s", $studentId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $student = $result->fetch_assoc();

        // التحقق من صحة كلمة المرور
        if (password_verify($passInput, $student['password'])) {
            // تسجيل الدخول ناجح: حفظ بيانات الطالب في الجلسة (Session)
            $_SESSION['student_id'] = $student['student_id'];
            $_SESSION['student_name'] = $student['student_name'];

            // تحويله إلى لوحة التحكم أو صفحة الطالب الخاصة
            echo "<script>
                    alert('مرحباً بك يا " . $student['student_name'] . "!');
                    window.location.href = 'student_dashboard.php';
                  </script>";
            exit();
        } else {
            // كلمة المرور خاطئة
            echo "<script>
                    alert('كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
                    window.location.href = 'portal.html';
                  </script>";
        }
    } else {
        // رقم الهوية غير مسجل في النظام
        echo "<script>
                    alert('رقم الهوية غير مسجل في النظام. تأكد من البيانات أو تواصل مع الإدارة.');
                    window.location.href = 'portal.html';
                  </script>";
    }

    $stmt->close();
}

$conn->close();
?>
