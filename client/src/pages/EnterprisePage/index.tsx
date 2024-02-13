import { useCallback, useEffect, useState } from "react";

import { IEnterprise } from "../../api/enterprise";
import API_Enterprise from "../../api/enterprise";
import DynamicTable from "../../components/DynamicTable";

import EnterpriseTableCell, {
  IEnterpriseTableCell,
} from "./EnterpriseTableCell";
import { enterpriseTableCells } from "./utils";

const EnterprisePage = () => {
  const [enterprises, setEnterprises] = useState<IEnterprise[]>([]);

  const fetchEnterprises = useCallback(() => {
    API_Enterprise.getEnterptises()
      .then((res) => {
        if (res) setEnterprises(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchEnterprises();
  }, [fetchEnterprises]);

  return (
    <DynamicTable
      rows={enterprises}
      headCells={enterpriseTableCells}
      hideFieldsOnList={["EnterpriseID"]}
      tableName="Enterprises"
      tabelCellComponent={(props: IEnterpriseTableCell) => (
        <EnterpriseTableCell {...props} />
      )}
    />
  );
};

export default EnterprisePage;
