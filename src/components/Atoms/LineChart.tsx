// LineChart.tsx

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

// Xác định kiểu dữ liệu cho props (nếu có thể nhận từ bên ngoài)
interface LineChartProps {
  labels: string[];
  views: number[];
  sell: number[];
}

const LineChart: React.FC<LineChartProps> = ({ labels, views, sell }) => {
  // Cấu hình dữ liệu cho biểu đồ
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Lượt Xem',
        data: views,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        fill: true,
      },
      {
        label: 'Lượt Mua',
        data: sell,
        borderColor: '#cc4c1f',
        backgroundColor: '#e3b3b3',
        pointBorderColor: '#cc4c1f',
        pointBackgroundColor: '#fff',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        fill: true,
      }
    ]
  };

  // Cấu hình cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sample Line Chart',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value',
        },
        beginAtZero: true,
      }
    }
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
