import React from "react";

import { ApplicationShell4 } from "../Organisms/Dashboard/ApplicationShell";

import { AdminDetail } from "./Dashboard/AdminDetail";

type AdminProps = {
  Role: string;
};
export const Admin: React.FC<AdminProps> = (prop) => {
  return (
    <>
      <ApplicationShell4
        MainComponent={
        <AdminDetail Role={prop.Role} />
        }
      />
    </>
  );
};
