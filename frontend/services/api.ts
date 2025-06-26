import axios from 'axios';

const api = axios.create({
  baseURL: "task-manager-fullstack-production-e830.up.railway.app", // Troque para o endereço do seu backend NestJS
});

export default api;
