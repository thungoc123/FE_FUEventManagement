import React from 'react'
import { ApplicationShell4 } from '../../../Organisms/Dashboard/ApplicationShell'
import { TableTemplate } from '../../../Organisms/Dashboard/TableTemplate'
import { GridList6 } from '../../../Organisms/Sponsor/SponsorProgram'
import { CreateProgram } from '../../../Organisms/Sponsor/CreateProgram'

export const AddProgram = () => {
  return (
    <div>
        <ApplicationShell4
        MainComponent={
          <CreateProgram
          />
        
        }
        StateComponent={
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
          Create sponsor program
        </h2>
        }
      />
    </div>
  )
}
