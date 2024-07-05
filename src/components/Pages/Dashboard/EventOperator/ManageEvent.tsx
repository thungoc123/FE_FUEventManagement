import React from "react"
import { ApplicationShell4 } from "../../../Organisms/Dashboard/ApplicationShell"
import { UnpublishEvent } from "../../../Organisms/EventOperator/UnpublishEvent"
type Props = {
    component:React.ReactNode
}
export const ManageEvent:React.FC<Props> = (prop) => {
    return (
        <>
            <ApplicationShell4 
                MainComponent={prop.component}
            />
        </>
    )
}