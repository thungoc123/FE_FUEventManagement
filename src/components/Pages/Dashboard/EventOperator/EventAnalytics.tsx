import { useGetListEventQuery } from "../../../../Features/EventManage/eventApi";
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần của Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export const EventAnalytics = () => {
     const { data: Events, refetch, isLoading, error } = useGetListEventQuery();
     const numberUnpublishEvent = Events?.filter((event) => event.stateEvent.name === "UNPUBLISH").length || 0;
     const numberPublishEvent = Events?.filter((event) => event.stateEvent.name === "PUBLISH").length || [];
     const numberHappenedEvent = Events?.filter((event) => event.stateEvent.name === "HAPPENED").length || 0;
     console.log('numberUnpublishEvent', numberUnpublishEvent,numberPublishEvent, numberHappenedEvent );
     const data = {
          labels: ['Unpublish Event', 'Publish Event', 'Happened Event'],
          datasets: [
            {
              label: 'Events ',
              data: [numberUnpublishEvent, numberPublishEvent, numberHappenedEvent], // Các giá trị cho các phần của biểu đồ
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)', // Màu nền cho mỗi phần
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)', // Màu viền cho mỗi phần
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
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
          <div style={{ width: '50%', margin: 'auto' }}>
            <Pie data={data} options={options} />
          </div>
        );
}

