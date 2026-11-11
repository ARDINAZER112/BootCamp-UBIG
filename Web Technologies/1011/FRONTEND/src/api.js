import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const login = (id_card_number, password) =>
  api.post('/auth/login', { id_card_number, password });

export const logout = (token) =>
  api.post(`/auth/logout?token=${token}`);

export const getConsultation = (token) =>
  api.get(`/consultations?token=${token}`);

export const requestConsultation = (token, data) =>
  api.post(`/consultations?token=${token}`, data);

export const getSpots = (token) =>
  api.get(`/spots?token=${token}`);

export const getSpotDetail = (token, spotId, date) => {
  let url = `/spots/${spotId}?token=${token}`;
  if (date) url += `&date=${date}`;
  return api.get(url);
};

export const getVaccinations = (token) =>
  api.get(`/vaccinations?token=${token}`);

export const registerVaccination = (token, data) =>
  api.post(`/vaccinations?token=${token}`, data);

export default api;

