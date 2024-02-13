// Task 4. Frontend component
import { useEffect } from "react";

import DynamicTable from "../../components/DynamicTable";
import useEnterprise from "../../hooks/useEnterprise";

import UserTableCell, { IUserTableCell } from "./UserTableCell";
import { userTableCells } from "./utils";

type Props = {
  taxId: number;
};

const UserPage = ({ taxId }: Props) => {
  const { getUsers, users } = useEnterprise(taxId, 1);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <DynamicTable
      rows={users}
      headCells={userTableCells}
      hideFieldsOnList={[
        "UserID",
        "Login",
        "Password",
        "Permissions",
        //"RegistrationDate",
      ]}
      tabelCellComponent={(props: IUserTableCell) => (
        <UserTableCell {...props} />
      )}
    />
  );
};

export default UserPage;
