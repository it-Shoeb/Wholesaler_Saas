import api from "../api";

export const getCustomers = async () => {
  try {
    const { data } = await api.get(`/customer`);
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const getCustomer = async (id) => {
  try {
    const { data } = await api.get(`/customer/${id}`);
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const postCustomer = async (customerData) => {
  console.log("customerData:", customerData);
  try {
    const { data } = await api.post(`/customer`, customerData);
    console.log("data:", data);
    if (!data.success) {
      return { data: null, error: data.message };
    }
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const putCustomer = async (id, customerData) => {
  try {
    const { data } = await api.put(`/customer/${id}`, customerData);
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const deleteCustomer = async (id) => {
  try {
    const { data } = await api.delete(`/customer/${id}`);
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
