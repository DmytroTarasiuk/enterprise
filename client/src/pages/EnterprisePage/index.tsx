import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { IEnterprise } from "../../api/enterprise";
import API_Enterprise from "../../api/enterprise";
import DynamicTable from "../../components/DynamicTable";
import { showModalWithParams } from "../../redux/modal/actions";
import { CustomModalTypes } from "../../redux/modal/state";

import EnterpriseTableCell, {
  IEnterpriseTableCell,
} from "./EnterpriseTableCell";
import { enterpriseTableCells } from "./utils";

const EnterprisePage = () => {
  const [enterprises, setEnterprises] = useState<IEnterprise[]>([]);
  const dispatch = useDispatch();

  const fetchEnterprises = useCallback(() => {
    API_Enterprise.getEnterptises()
      .then((res) => {
        if (res) setEnterprises(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onAddEnterprise = useCallback(() => {
    dispatch(
      showModalWithParams({
        modalType: CustomModalTypes.ADD_ENTERPRISE,
        params: {
          refetch: fetchEnterprises,
        },
      }),
    );
  }, [dispatch, fetchEnterprises]);

  useEffect(() => {
    fetchEnterprises();
  }, [fetchEnterprises]);

  return (
    <DynamicTable
      rows={enterprises}
      headCells={enterpriseTableCells}
      hideFieldsOnList={["EnterpriseID"]}
      tableName="Enterprises"
      onAdd={onAddEnterprise}
      tabelCellComponent={(props: IEnterpriseTableCell) => (
        <EnterpriseTableCell {...props} />
      )}
    />
  );
};

export default EnterprisePage;
