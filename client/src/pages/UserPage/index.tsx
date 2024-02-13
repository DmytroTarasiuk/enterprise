// Task 4. Frontend component
import { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import DynamicTable from "../../components/DynamicTable";
import useEnterprise from "../../hooks/useEnterprise";

import UserTableCell, { IUserTableCell } from "./UserTableCell";
import { userTableCells } from "./utils";

import styles from "./styles.module.css";

const UserPage = () => {
  const [taxId, setTaxId] = useState<number>(123456789);
  const { getUsers, users } = useEnterprise(taxId);

  const handleChange = (event: any) => {
    setTaxId(event.target.value);
  };

  const handleClick = useCallback(() => {
    getUsers(taxId);
  }, [getUsers, taxId]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className={styles.container}>
      <DynamicTable
        rows={users}
        headCells={userTableCells}
        hideFieldsOnList={[
          "UserID",
          "Login",
          "Password",
          "Permissions",
          "RegistrationDate",
        ]}
        tableName="Users"
        tabelCellComponent={(props: IUserTableCell) => (
          <UserTableCell {...props} />
        )}
        toolbarActionComponent={
          <div className={styles.actions}>
            <TextField
              id="outlined-basic"
              label="Tax ID"
              size="small"
              onChange={handleChange}
              value={taxId}
              variant="outlined"
              placeholder="Please enter a tax id"
              className={styles.input}
            />
            <Button onClick={handleClick} variant="contained" color="primary">
              Apply
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default UserPage;
