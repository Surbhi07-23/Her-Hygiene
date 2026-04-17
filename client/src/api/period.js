import API from "./axios";

export const addPeriod = (data) =>
  API.post("/period", data);

export const getPeriods = () =>
  API.get("/period");

export const deletePeriod = (id) =>
  API.delete(`/period/${id}`);

export const updatePeriod = (id, data) =>
  API.put(`/period/${id}`, data);

export const getStats = () =>
  API.get("/period/stats");