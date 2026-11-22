
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

// 1. إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAYMDMJAlx0GiFxmnw06oxZdMJAoP5vQk8",
  authDomain: "ryan-school-4f1c2.firebaseapp.com",
  projectId: "ryan-school-4f1c2",
  storageBucket: "ryan-school-4f1c2.firebasestorage.app",
  messagingSenderId: "74730270447",
  appId: "1:74730270447:web:f42fe3d0b869d0a337f51a"
};

// 2. تشغيل Firebase Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 3. عناصر الصفحة
const loginForm = document.getElementById("login-form");
const message = document.getElementById("login-message");

function showMessage(text, color = "red") {
  message.textContent = text;
  message.style.color = color;
}

// 4. تسجيل دخول الطالب
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const studentId = document
    .getElementById("national-id")
    .value.trim();

  const password = document
    .getElementById("password")
    .value;

  const remember = document.getElementById("remember").checked;
  const button = loginForm.querySelector(".btn-submit");

  if (!studentId || !password) {
    showMessage("يرجى إدخال رقم الهوية وكلمة المرور");
    return;
  }

  // يجب أن يتطابق هذا التحويل مع طريقة إنشاء حسابات الطلاب
  const studentEmail =
    `${studentId}@ryan-school-4f1c2.firebaseapp.com`;

  try {
    button.disabled = true;
    button.textContent = "جاري تسجيل الدخول...";

    await setPersistence(
      auth,
      remember
        ? browserLocalPersistence
        : browserSessionPersistence
    );

    const userCredential = await signInWithEmailAndPassword(
      auth,
      studentEmail,
      password
    );

    console.log("Student logged in:", userCredential.user.uid);

    showMessage("تم تسجيل الدخول بنجاح", "green");

    window.location.href = "student-dashboard.html";

  } catch (error) {
    console.error("Login error:", error);

    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/user-not-found" ||
      error.code === "auth/wrong-password"
    ) {
      showMessage("رقم الهوية أو كلمة المرور غير صحيحة");
    } else if (error.code === "auth/too-many-requests") {
      showMessage("محاولات كثيرة، يرجى المحاولة لاحقاً");
    } else {
      showMessage("تعذر تسجيل الدخول. يرجى المحاولة لاحقاً");
    }

  } finally {
    button.disabled = false;
    button.textContent = "تسجيل الدخول";
  }
});

// 5. إعادة تعيين كلمة المرور
// لا نسمح بتغيير كلمة المرور بمجرد إدخال رقم الهوية.
// سنربط هذه الخاصية لاحقاً بطريقة تحقق آمنة.
const resetForm = document.getElementById("reset-form");

resetForm.addEventListener("submit", (event) => {
  event.preventDefault();

  showMessage(
    "إعادة تعيين كلمة المرور تحتاج إلى التحقق من هوية الطالب أولاً"
  );
});
