import Account from "../../../Organisms/Dashboard/Account"
import { ApplicationShell4 } from "../../../Organisms/Dashboard/ApplicationShell"

export const ManageAccount = () => {
  return(
    <>
    <ApplicationShell4 
      MainComponent= {<Account />}
    />
    </>
  )
}