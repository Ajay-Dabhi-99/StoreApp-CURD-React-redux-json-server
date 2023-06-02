import {
  ADD_STORE,
  DELETE_STORE,
  LOGIN,
  REGISTER,
  SINGLE_STORE_DETAILS,
  STORE_DETAILS,
  UPDATE_STORE,
} from "../../api/constApi";
import { apiInstance } from "./axiosApi";

// login
export const logIn = () => {
  return apiInstance.get(LOGIN);
};

// Register
export const Register = (payload) => {
  return apiInstance.post(REGISTER,payload);
};

// Store Detail Find
export const fetchStore = (id) => {
  return apiInstance.get(`${STORE_DETAILS}${id}`);
};

// Single Store Detail Find
export const SingleStore = (id) => {
  return apiInstance.get(`${SINGLE_STORE_DETAILS}${id}`);
};

// Single Store Update Detail
export const updateStoreInfo = ({id, payload}) => {
  return apiInstance.patch(`${UPDATE_STORE}${id}`, payload);
};

// Add Store
export const AddStore = (payload) => {
  return apiInstance.post(ADD_STORE, payload);
};

// Delete Store
export const DeleteStore = (id) => {
  return apiInstance.delete(`${DELETE_STORE}${id}`);
};
