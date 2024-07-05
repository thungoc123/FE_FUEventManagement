import React from 'react';
// import './ProgressBar.css'; // Thêm một file CSS cho phần style

interface ProgressBarProps {
  currentStep: number;  // Bước hiện tại
  totalSteps: number;   // Tổng số bước
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
      <div className="progress-text">
        Step {currentStep}/{totalSteps}
      </div>
    </div>
  );
};

export default ProgressBar;