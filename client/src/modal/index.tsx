import { FunctionComponent, lazy, ReactNode, Suspense, useMemo } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { hideModal } from "../redux/modal/actions";
import { getModal } from "../redux/modal/selectors";
import { CustomModalTypes } from "../redux/modal/state";

let portalRoot = document.getElementById("portal");
if (!portalRoot) {
  portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "portal");
  document.body.appendChild(portalRoot);
}

const AddUserForm = lazy(() => import("../pages/UserPage/UserForm"));
const AddEnterpriseForm = lazy(
  () => import("../pages/EnterprisePage/EnterpriseForm"),
);

interface IPortal {
  children: ReactNode;
}

const Portal: FunctionComponent<IPortal> = ({ children }) => {
  return ReactDOM.createPortal(children, portalRoot as any);
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#01889F",
    },
    secondary: {
      main: "#01889F",
    },
  },
});

const renderContent = (modalType: string, hideModal?: () => void) => {
  switch (modalType) {
    case CustomModalTypes.ADD_USER:
      return (
        <Suspense fallback={"loading"}>
          <AddUserForm />
        </Suspense>
      );
    case CustomModalTypes.ADD_ENTERPRISE:
      return (
        <Suspense fallback={"loading"}>
          <AddEnterpriseForm />
        </Suspense>
      );
  }
};

const CustomModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector(getModal);
  const { showModal, modalType } = modal;
  const onHideModal = () => {
    dispatch(hideModal?.());
  };

  const renderContentMemo = useMemo(
    () => renderContent(modalType, hideModal),
    [modalType],
  );

  return (
    <Portal>
      <Dialog open={showModal} onClose={onHideModal}>
        <div>
          <div>
            {!renderContentMemo ? (
              <div>
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  size={30}
                  thickness={8}
                />
              </div>
            ) : (
              <ThemeProvider theme={theme}>{renderContentMemo}</ThemeProvider>
            )}
          </div>
        </div>
      </Dialog>
    </Portal>
  );
};

export default CustomModal;
