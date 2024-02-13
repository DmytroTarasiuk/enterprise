import axios from "axios";

const apiUrl = "http://localhost:5001/enterprise";

export interface IEnterprise {
  name: string;
  taxId: number;
  address: string;
}

const Enterprise = {
  getEnterptises: () => {
    return axios.get(`${apiUrl}/enterprises`);
  },
  addEnterprise: (body: IEnterprise) => {
    const data = {
      ...body,
    };
    return axios.post(`${apiUrl}/add`, data);
  },
};

export default Enterprise;
