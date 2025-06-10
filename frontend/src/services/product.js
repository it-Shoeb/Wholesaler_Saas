import api from "./api";

export const getProducts = async () => {
  try {
    const { data } = await api.get("/product");
    return { data: data?.data?.reverse(), error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const getProduct = async (id) => {
  try {
    const { data } = await api.get(`/product/${id}`);
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const putProduct = async (id, req) => {
  try {
    const { data } = await api.put(`/product/${id}`, { ...req });
    return { data: data, error: null };
    F;
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data } = await api.delete(`/product/${id}`);
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
