import { useCallback, useState } from "react";

import API_USERS from "../api/users";

const useEnterprise = (taxId: number) => {
  const [users, setUsers] = useState([]);

  const getUsers = useCallback((id?: number) => {
    API_USERS.getUsersByTaxId(id ? id : taxId)
      .then((res) => {
        if (res) setUsers(res.data);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    getUsers,
    users,
  };
};

export default useEnterprise;
