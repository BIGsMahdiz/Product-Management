import api from "@/configs/api";

const useRegister = (data) => api.post("/auth/register", data);

const useLogin = (data) => api.post("/auth/login", data);

// It's true that the word <<use>> should be used for custom hooks, and I used it here for more readability.

const addProducts = (data) => api.post("/products", data);

const deleteProducts = (id) => api.delete(`/products/${id}`);

const editProducts = (id, data) => {
  delete data.id;
  return api.put(`/products/${id}`, data);
};

export { useRegister, useLogin, addProducts, deleteProducts, editProducts };
