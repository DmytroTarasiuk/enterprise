import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";

import API_USERS from "../../../api/users";
import { hideModal } from "../../../redux/modal/actions";
import { getModalParams } from "../../../redux/modal/selectors";

import styles from "./styles.module.css";

const UserForm = () => {
  const modalParams = useSelector(getModalParams);
  const dispatch = useDispatch();

  const { refetch, taxId } = modalParams;

  const initialState = useMemo(() => {
    return {
      taxId: taxId || null,
      userHashes: ["hash1", "has2"],
      permissions: ["read"],
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    };
  }, [taxId]);

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
      const data = {
        taxId: values.taxId,
        userHashes: values.userHashes,
        permissions: values.permissions,
        userData: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
        },
      };
      API_USERS.addUser(data)
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
        id="email"
        label="Email"
        type="text"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        {...getFieldProps("email")}
      />
      <TextField
        id="first-name"
        label="First Name"
        type="text"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        {...getFieldProps("firstName")}
      />
      <TextField
        id="last-name"
        label="Last Name"
        type="text"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        {...getFieldProps("lastName")}
      />
      <TextField
        id="phone"
        label="Phone"
        type="number"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        {...getFieldProps("phoneNumber")}
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

export default UserForm;
