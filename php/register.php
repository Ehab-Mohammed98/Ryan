<?php
// إعدادات الاتصال بقاعدة البيانات
$host = "localhost";
$username = "root";       // اسم مستخدم قاعدة البيانات
$password = "";           // كلمة المرور (تكون فارغة في XAMPP غالباً)
$dbname = "alrayan_school";

// إنشاء الاتصال
$conn = new mysqli($host, $username, $password, $dbname);
$conn->set_charset("utf8mb4");

// التأكد من نجاح الاتصال
if ($conn->connect_error) {
    die("فشل الاتصال بقاعدة البيانات: " . $conn->connect_error);
}

// التأكد أن الطلب قادم عبر نموذج POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // استقبال البيانات وتنظيفها
    $studentName = trim($_POST['studentName'] ?? '');
    $idNumber    = trim($_POST['idNumber'] ?? '');
    $birthDate   = $_POST['birthDate'] ?? '';
    $nationality = trim($_POST['nationality'] ?? '');
    $gender      = $_POST['gender'] ?? '';
    $stage       = $_POST['stage'] ?? '';
    $grade       = $_POST['grade'] ?? '';
    $prevSchool  = trim($_POST['prevSchool'] ?? '');
    $parentName  = trim($_POST['parentName'] ?? '');
    $relation    = $_POST['relation'] ?? '';
    $mobile      = trim($_POST['mobile'] ?? '');
    $parentEmail = trim($_POST['parentEmail'] ?? '');
    $notes       = trim($_POST['notes'] ?? '');

    // تجهيز أمر الإدخال الآمن
    $sql = "INSERT INTO registrations 
            (student_name, id_number, birth_date, nationality, gender, stage, grade, prev_school, parent_name, relation, mobile, parent_email, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "sssssssssssss",
        $studentName, $idNumber, $birthDate, $nationality, $gender,
        $stage, $grade, $prevSchool, $parentName, $relation,
        $mobile, $parentEmail, $notes
    );

    if ($stmt->execute()) {
        // رسالة نجاح وتوجيه المستخدم
        echo "<script>
                alert('تم استلام طلب التسجيل وحفظه بنجاح! سيتواصل معكم فريق القبول قريباً.');
                window.location.href = 'index.html';
              </script>";
    } else {
        echo "حدث خطأ أثناء حفظ البيانات: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
