// Task 4. Frontend component
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import DynamicTable from "../../components/DynamicTable";
import useEnterprise from "../../hooks/useEnterprise";
import CustomModal from "../../modal";
import { showModalWithParams } from "../../redux/modal/actions";
import { CustomModalTypes } from "../../redux/modal/state";

import UserTableCell, { IUserTableCell } from "./UserTableCell";
import { userTableCells } from "./utils";

import styles from "./styles.module.css";

const UserPage = () => {
  const [taxId, setTaxId] = useState<number>(123456789);
  const { getUsers, users } = useEnterprise(taxId);
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    setTaxId(event.target.value);
  };

  const handleClick = useCallback(() => {
    getUsers(taxId);
  }, [getUsers, taxId]);

  const onAddUser = useCallback(() => {
    dispatch(
      showModalWithParams({
        modalType: CustomModalTypes.ADD_USER,
        params: {
          refetch: () => getUsers(taxId),
          taxId: taxId,
        },
      }),
    );
  }, [dispatch, getUsers, taxId]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className={styles.container}>
      <DynamicTable
        rows={users}
        headCells={userTableCells}
        onAdd={onAddUser}
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
              style={{ minWidth: "100px" }}
            />
            <Button onClick={handleClick} variant="contained" color="primary">
              Apply
            </Button>
          </div>
        }
      />
      <CustomModal />
    </div>
  );
};

export default UserPage;
