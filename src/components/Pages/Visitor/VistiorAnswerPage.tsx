import { useEffect, useState } from "react";
import ProgressBar from "../../Atoms/ProgressBar";
import { Button } from "@relume_io/relume-ui";

const VisitorAnswerPage = () => {
const [currentStep, setCurrentStep] = useState(1);
 const totalSteps = 6;
 useEffect(() => {
                         const handleKeyDown = (event) => {
                           if (event.key === 'Enter') {
                             console.log('Enter key pressed');
                             setCurrentStep(prev => Math.min(prev + 1, totalSteps))
                             // Thực hiện hành động mong muốn tại đây, ví dụ: chuyển sang bước tiếp theo
                           }
                           if(event.key === 'ArrowLeft')
                                                   {
                                                   console.log('ArrowLeft key pressed');
                                                   setCurrentStep(prev => Math.max(prev - 1, 1))
                                                   }
                         };
                     
                         // Thêm event listener
                         document.addEventListener('keydown', handleKeyDown);
                     
                         // Dọn dẹp
                         return () => {
                           document.removeEventListener('keydown', handleKeyDown);
                         };
                       }, []); // Đảm bảo rằng useEffect này chỉ chạy một lần
return(
  <>
  <div className="w-3/4 mx-auto mt-4">
   <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
   {currentStep === 1 && (
        <div className="w-full h-full mx-auto p-8 border border-black  shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Product survey</h1>
              <p className="text-gray-600 mb-6">We have a few questions for you to help us improve our product.</p>
                <div className="flex justify-center items-center space-x-4">
                  <Button className="py-2 px-6">
                    </Button>
                           <span className="text-gray-600">Press <span className="font-bold">Enter ↵</span></span>
                         </div>
                         <div className="flex justify-center items-center text-gray-500 mt-4">
                           <span className="material-icons-outlined text-gray-400">schedule</span> {/* Biểu tượng thời gian */}
                           <span className="ml-2">Takes 1 minute</span>
                         </div>
                       </div>
   )}
   <button onClick={() => setCurrentStep(prev => Math.min(prev + 1, totalSteps))}>
        Next Step
      </button>
      <button onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}>
        Previous Step
      </button>
</div>
  </>
  )
};

export default VisitorAnswerPage;