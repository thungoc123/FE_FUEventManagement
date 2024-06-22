import React from 'react'
import { ApplicationShell4 } from '../../../Organisms/Dashboard/ApplicationShell'
import { TableTemplate } from '../../../Organisms/Dashboard/TableTemplate'
import { GridList6 } from '../../../Organisms/Sponsor/SponsorProgram'

export const Program = () => {
  return (
    <div>
        <ApplicationShell4
        MainComponent={
          < GridList6
          />
        }
      />
    </div>
  )
}
