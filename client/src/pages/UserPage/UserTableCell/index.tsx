import { useMemo } from "react";
import TableCell from "@mui/material/TableCell";

import styles from "./styles.module.css";

export interface IUserTableCell {
  keyItem: string;
  row: any;
}

const UserTableCell = ({ keyItem, row }: IUserTableCell) => {
  const rowContent = useMemo(() => {
    switch (keyItem) {
      default:
        return row[keyItem];
    }
  }, [keyItem, row]);

  return (
    <TableCell align="left" padding="normal">
      <div className={styles.cell}>{rowContent}</div>
    </TableCell>
  );
};

export default UserTableCell;
