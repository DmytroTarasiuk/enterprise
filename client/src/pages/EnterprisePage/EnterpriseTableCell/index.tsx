import { useMemo } from "react";
import TableCell from "@mui/material/TableCell";

import styles from "../../UserPage/styles.module.css";

export interface IEnterpriseTableCell {
  keyItem: string;
  row: any;
}

const EnterpriseTableCell = ({ keyItem, row }: IEnterpriseTableCell) => {
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

export default EnterpriseTableCell;
