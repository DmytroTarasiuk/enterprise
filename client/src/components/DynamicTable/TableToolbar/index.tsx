import React from "react";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import styles from "./styles.module.css";

interface EnhancedTableToolbarProps {
  numSelected: number;
  tableName?: string;
  rightComponent?: React.ReactElement;
  onAddAction?: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, tableName, rightComponent, onAddAction } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableName}
        </Typography>
      )}
      <div className={styles.actions}>
        {onAddAction && (
          <Button variant="contained" color="primary" onClick={onAddAction}>
            Add
          </Button>
        )}
        {rightComponent}
      </div>
    </Toolbar>
  );
}

export default EnhancedTableToolbar;
