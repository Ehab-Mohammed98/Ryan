<script>
  document.addEventListener("DOMContentLoaded", () => {
    const stageSelect = document.getElementById("stage");
    const gradeSelect = document.getElementById("grade");

    const gradesByStage = {
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

    stageSelect.addEventListener("change", function () {
      const selectedStage = this.value;
      const grades = gradesByStage[selectedStage] || [];

      // تفريغ الخيارات القديمة
      gradeSelect.innerHTML = '<option value="" disabled selected>اختر الصف...</option>';

      if (grades.length > 0) {
        grades.forEach((g) => {
          const option = document.createElement("option");
          option.value = g.value;
          option.textContent = g.text;
          gradeSelect.appendChild(option);
        });
        gradeSelect.disabled = false; // تفعيل القائمة
      } else {
        gradeSelect.disabled = true;
      }
    });
  });
</script>
