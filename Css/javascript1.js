const ctx = document.getElementById('schoolStatsChart').getContext('2d');
    
    // البيانات الأساسية للمؤشرات
    const chartData = {
      labels: ['نسبة التفوق الأكاديمي (%)', 'الأنشطة والبرامج الإثرائية', 'سنوات الخبرة التعليمية'],
      datasets: [{
        label: 'مؤشرات مدرسة الريان',
        data: [98, 45, 15],
        backgroundColor: [
          '#0A2540', // Navy Blue
          '#0D9488', // Teal Accent
          '#F59E0B'  // Gold Accent
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 8
      }]
    };

    // إعدادات الرسم البياني
    let currentChart = new Chart(ctx, {
      type: 'bar', // النوع الافتراضي: شريطي
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // إخفاء العنوان العلوي في المخطط الشريطي
          },
          tooltip: {
            titleFont: { family: 'Cairo' },
            bodyFont: { family: 'Cairo' }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 110,
            ticks: { font: { family: 'Cairo' } }
          },
          x: {
            ticks: { font: { family: 'Cairo', weight: 'bold' } }
          }
        }
      }
    });

    // دالة التبديل التفاعلي بين الشريطي والدائري
    function updateChartType(newType, btnElement) {
      // تحديث حالة الأزرار
      document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
      btnElement.classList.add('active');

      // تدمير الرسم القديم وإعادة إنشائه بالنوع الجديد
      currentChart.destroy();
      
      const isDoughnut = newType === 'doughnut';
      
      currentChart = new Chart(ctx, {
        type: newType,
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: isDoughnut, // إظهار دليل الألوان في حالة المخطط الدائري
              position: 'bottom',
              labels: { font: { family: 'Cairo', size: 12 } }
            },
            tooltip: {
              titleFont: { family: 'Cairo' },
              bodyFont: { family: 'Cairo' }
            }
          },
          // إخفاء المحاور (X و Y) إذا كان المخطط دائرياً
          scales: isDoughnut ? {} : {
            y: {
              beginAtZero: true,
              max: 110,
              ticks: { font: { family: 'Cairo' } }
            },
            x: {
              ticks: { font: { family: 'Cairo', weight: 'bold' } }
            }
          }
        }
      });
    }
