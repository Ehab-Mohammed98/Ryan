document.addEventListener('DOMContentLoaded', () => {
  const stageSelect = document.getElementById('stage');
  const gradeSelect = document.getElementById('grade');

  // مصفوفة المراحل والصفوف التابعة لها
  const gradesByStage = {
    kg: [
      { value: 'kg1', text: 'المستوى الأول (KG1 - روضة)' },
      { value: 'kg2', text: 'المستوى الثاني (KG2 - تمهيدي)' }
    ],
    primary: [
      { value: 'p1', text: 'الصف الأول الابتدائي' },
      { value: 'p2', text: 'الصف الثاني الابتدائي' },
      { value: 'p3', text: 'الصف الثالث الابتدائي' },
      { value: 'p4', text: 'الصف الرابع الابتدائي' },
      { value: 'p5', text: 'الصف الخامس الابتدائي' },
      { value: 'p6', text: 'الصف السادس الابتدائي' }
    ],
    middle: [
      { value: 'm1', text: 'الصف الأول المتوسط' },
      { value: 'm2', text: 'الصف الثاني المتوسط' },
      { value: 'm3', text: 'الصف الثالث المتوسط' }
    ],
    high: [
      { value: 'h1', text: 'الصف الأول الثانوي' },
      { value: 'h2', text: 'الصف الثاني الثانوي' },
      { value: 'h3', text: 'الصف الثالث الثانوي' }
    ]
  };

  // التأكد من وجود العناصر في الصفحة قبل تنفيذ الكود
  if (!stageSelect || !gradeSelect) return;

  stageSelect.addEventListener('change', (event) => {
    const selectedStage = event.target.value;
    const grades = gradesByStage[selectedStage] ?? [];

    // إعادة تعيين قائمة الصفوف
    gradeSelect.innerHTML = '<option value="" disabled selected>اختر الصف / المستوى...</option>';

    if (grades.length > 0) {
      gradeSelect.disabled = false;
      grades.forEach(({ value, text }) => {
        const option = new Option(text, value);
        gradeSelect.add(option);
      });
    } else {
      gradeSelect.disabled = true;
    }
  });
});
