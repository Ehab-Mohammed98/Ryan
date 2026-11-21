
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "ضع_API_KEY_هنا",
  authDomain: "ضع_AUTH_DOMAIN_هنا",
  projectId: "ضع_PROJECT_ID_هنا",
  storageBucket: "ضع_STORAGE_BUCKET_هنا",
  messagingSenderId: "ضع_SENDER_ID_هنا",
  appId: "ضع_APP_ID_هنا"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const form = document.getElementById("registrationForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const submitButton = form.querySelector(
    'button[type="submit"]'
  );

  submitButton.disabled = true;
  submitButton.textContent = "جاري إرسال الطلب...";

  try {
    const registrationData = {
      studentName: document.getElementById("studentName").value.trim(),
      nationalId: document.getElementById("idNumber").value.trim(),
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

    await addDoc(
      collection(db, "registrationRequests"),
      registrationData
    );

    alert("تم إرسال طلب التسجيل بنجاح، شكراً لكم.");

    form.reset();

  } catch (error) {
    console.error("Registration error:", error);

    alert("تعذر إرسال الطلب. يرجى المحاولة مرة أخرى.");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "إرسال طلب التسجيل";
  }
});
