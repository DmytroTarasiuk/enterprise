import { useCallback, useState } from "react";

import API_USERS from "../api/users";

const useEnterprise = (taxId: number, page: number) => {
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(() => {
    API_USERS.getUsersByTaxId(taxId)
      .then((res) => {
        if (res) setUsers(res.data);
      })
      .catch((error) => console.log(error));
  }, [taxId]);

  return {
    getUsers,
    users,
  };
};

export default useEnterprise;
