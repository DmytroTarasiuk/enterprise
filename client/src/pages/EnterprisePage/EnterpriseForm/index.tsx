import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";

import API_Enterprise from "../../../api/enterprise";
import { hideModal } from "../../../redux/modal/actions";
import { getModalParams } from "../../../redux/modal/selectors";

import styles from "../../UserPage/UserForm/styles.module.css";

const EnterpriseForm = () => {
  const modalParams = useSelector(getModalParams);
  const dispatch = useDispatch();

  const { refetch } = modalParams;

  const initialState = useMemo(() => {
    return {
      name: "",
      taxId: null,
      address: "",
    };
  }, []);

  const { getFieldProps, handleSubmit, resetForm, submitForm } = useFormik({
    initialValues: initialState,
    //validate,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      onHandleSubmit(values);
      setSubmitting(false);
      resetForm();
    },
  });

  const onHandleSubmit = useCallback(
    (values: any) => {
      API_Enterprise.addEnterprise(values)
        .then((res) => {
          if (res) {
            refetch?.();
            dispatch(hideModal());
          }
        })
        .catch((error) => console.log(error));
    },
    [dispatch, refetch],
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextField
        id="name"
        label="Name"
        type="text"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        {...getFieldProps("name")}
      />
      <TextField
        id="taxId"
        label="TaxID"
        type="number"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        {...getFieldProps("taxId")}
      />
      <TextField
        id="address"
        label="Address"
        type="text"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        {...getFieldProps("address")}
      />
      <Button
        className={styles.button}
        color="primary"
        variant="contained"
        onClick={submitForm}
      >
        Add
      </Button>
    </form>
  );
};

export default EnterpriseForm;
