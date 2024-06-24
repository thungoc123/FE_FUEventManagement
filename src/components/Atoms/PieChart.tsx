// App.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // Dữ liệu cho biểu đồ tròn
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3], // Các giá trị cho các phần của biểu đồ
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)', // Màu nền cho mỗi phần
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)', // Màu viền cho mỗi phần
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1, // Độ rộng viền
      },
    ],
  };

  // Các tùy chọn cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Vị trí của legend (chú thích)
      },
      tooltip: {
        enabled: true, // Hiển thị tooltip
      },
    },
  };

  return (
    <div style={{ width: '100%', margin: 'auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
