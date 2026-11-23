  document.addEventListener("DOMContentLoaded", () => {
      const stageSelect = document.getElementById("stage");
      const gradeSelect = document.getElementById("grade");
      const regForm = document.getElementById("registrationForm");
      const successAlert = document.getElementById("successAlert");
      const refNum = document.getElementById("refNum");

      const gradesData = {
        kg: [
          { value: "kg1", text: "المستوى الأول (KG1)" },
          { value: "kg2", text: "المستوى الثاني (KG2)" },
          { value: "kg3", text: "المستوى الثالث / التمهيدي (KG3)" }
        ],
        primary: [
          { value: "p1", text: "الصف الأول الابتدائي" },
          { value: "p2", text: "الصف الثاني الابتدائي" },
          { value: "p3", text: "الصف الثالث الابتدائي" },
          { value: "p4", text: "الصف الرابع الابتدائي" },
          { value: "p5", text: "الصف الخامس الابتدائي" },
          { value: "p6", text: "الصف السادس الابتدائي" }
        ],
        middle: [
          { value: "m1", text: "الصف الأول المتوسط" },
          { value: "m2", text: "الصف الثاني المتوسط" },
          { value: "m3", text: "الصف الثالث المتوسط" }
        ],
        high: [
          { value: "h1", text: "الصف الأول الثانوي (السنة المشتركة)" },
          { value: "h2", text: "الصف الثاني الثانوي" },
          { value: "h3", text: "الصف الثالث الثانوي" }
        ]
      };

      // تحديث قائمة الصفوف عند تغيير المرحلة
      stageSelect.addEventListener("change", function () {
        const selected = this.value;
        const list = gradesData[selected] || [];

        gradeSelect.innerHTML = '<option value="" disabled selected>اختر الصف الدراسي...</option>';

        if (list.length > 0) {
          list.forEach((item) => {
            const opt = document.createElement("option");
            opt.value = item.value;
            opt.textContent = item.text;
            gradeSelect.appendChild(opt);
          });
          gradeSelect.disabled = false;
        } else {
          gradeSelect.disabled = true;
        }
      });

      // معالجة إرسال النموذج وعرض رقم مرجعي
      regForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const randomCode = "RY-" + Math.floor(100000 + Math.random() * 900000);
        refNum.textContent = randomCode;
        successAlert.style.display = "block";
        successAlert.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
