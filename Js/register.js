  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAYMDMJAlx0GiFxmnw06oxZdMJAoP5vQk8",
    authDomain: "ryan-school-4f1c2.firebaseapp.com",
    projectId: "ryan-school-4f1c2",
    storageBucket: "ryan-school-4f1c2.firebasestorage.app",
    messagingSenderId: "74730270447",
    appId: "1:74730270447:web:f42fe3d0b869d0a337f51a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


// 1. استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

// 2. إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAYMDMJAlx0GiFxmnw06oxZdMJAoP5vQk8",
  authDomain: "ryan-school-4f1c2.firebaseapp.com",
  projectId: "ryan-school-4f1c2",
  storageBucket: "ryan-school-4f1c2.firebasestorage.app",
  messagingSenderId: "74730270447",
  appId: "1:74730270447:web:f42fe3d0b869d0a337f51a"
};

// 3. تشغيل Firebase والاتصال بقاعدة البيانات
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase connected successfully");

// 4. تحديد نموذج التسجيل
const form = document.getElementById("registrationForm");

form.addEventListener("submit", async function(event) {

  event.preventDefault();

  console.log("Registration form submitted");

  const submitButton = form.querySelector(".btn-register");

  submitButton.disabled = true;
  submitButton.textContent = "جاري إرسال الطلب...";

  // 5. جمع بيانات الطالب وولي الأمر
  const registrationData = {
    studentName: document.getElementById("studentName").value.trim(),
    idNumber: document.getElementById("idNumber").value.trim(),
    birthDate: document.getElementById("birthDate").value,
    nationality: document.getElementById("nationality").value.trim(),
    gender: document.getElementById("gender").value,

    stage: document.getElementById("stage").value,
    grade: document.getElementById("grade").value,
    prevSchool: document.getElementById("prevSchool").value.trim(),

    parentName: document.getElementById("parentName").value.trim(),
    relation: document.getElementById("relation").value,
    mobile: document.getElementById("mobile").value.trim(),
    parentEmail: document.getElementById("parentEmail").value.trim(),

    notes: document.getElementById("notes").value.trim(),

    status: "pending",
    createdAt: serverTimestamp()
  };

  console.log("Sending registration data to Firebase...");

  try {

    // 6. حفظ البيانات داخل مجموعة registrations
    const docRef = await addDoc(
      collection(db, "registrations"),
      registrationData
    );

    console.log("Registration saved successfully!");
    console.log("Document ID:", docRef.id);

    alert("تم إرسال طلب التسجيل بنجاح!");

    form.reset();

  } catch (error) {

    console.error("Firebase Error:", error);

    alert("حدث خطأ أثناء إرسال الطلب: " + error.message);

  } finally {

    submitButton.disabled = false;
    submitButton.textContent = "إرسال طلب التسجيل";

  }

});
