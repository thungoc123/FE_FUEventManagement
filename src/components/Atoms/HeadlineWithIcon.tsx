// ParentComponent.tsx
import React from 'react';

interface ParentComponentProps {
  Child: React.FC;
  title: string;
}

const HeadlineWithIcon : React.FC<ParentComponentProps> = ({ Child, title }) => {
  return (
    <div className="flex items-center space-x-2">
     
      <Child />
      <a href='' className="text-gray-600 font-medium">{title}</a>
    </div>
  );
};

export default HeadlineWithIcon;
