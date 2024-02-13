import axios from "axios";

const apiUrl = "http://localhost:5001/enterprise";

interface IUserData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface IAddUSer {
  taxId: number;
  userHashes: string[];
  permissions: string[];
  userData: IUserData;
}

const Users = {
  getUsersByTaxId: (taxId: number) => {
    return axios.get(`${apiUrl}/users/${taxId}`);
  },
  getUsers: () => {
    return axios.get(`${apiUrl}/users`);
  },
  getUsersRegisteredAfter: (date: string) => {
    return axios.get(`${apiUrl}/users/registered-after/${date}`);
  },
  addUser: (body: IAddUSer) => {
    const data = {
      ...body,
    };
    return axios.post(`${apiUrl}/users/add`, data);
  },
};

export default Users;
