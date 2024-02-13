export enum CustomModalTypes {
  ADD_USER = "ADD_USER",
  ADD_ENTERPRISE = "ADD_ENTERPRISE",
}

export default interface ModalState {
  modal: {
    showModal: boolean;
    modalType: string;
    params?: any;
    maxWidth?: "sm" | "xs" | "md" | "lg" | "xl";
    fullWidth?: boolean;
  };
}
