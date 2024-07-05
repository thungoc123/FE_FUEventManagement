// src/Components/SponsorProgramItem.tsx

import React from 'react';
import { SponsorProgram } from '../../../Types/sponsor_program';
import { useNavigate } from 'react-router-dom';

interface SponsorProgramItemProps {
  program: SponsorProgram;
}

const SponsorProgramItem: React.FC<SponsorProgramItemProps> = ({ program }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/sponsor-detail/${program.id}`);
  };
  return (
    <div className="flex flex-col items-stretch">
      <div className="relative mb-5 aspect-[1] size-full overflow-hidden md:mb-6 md:pt-[100%]">
        <img
          src={program.thumbnail}
          alt={program.title}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="mb-3 md:mb-4">
        <h5 className="text-md font-semibold md:text-lg">{program.title}</h5>
        <h6 className="md:text-md">{program.location}</h6>
      </div>
      <p>{program.description}</p>
      <div className="mt-6 grid grid-flow-col grid-cols-[max-content] gap-[0.875rem] self-start">
      <button
          onClick={handleButtonClick}
          className="px-4 py-2 bg-blue-500 text-white rounded ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary focus-visible:ring-offset-2"
        >
          View Program Details
        </button>
      </div>
    </div>
  );
};

export default SponsorProgramItem;
