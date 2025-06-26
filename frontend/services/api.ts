import axios from 'axios';

const api = axios.create({
  baseURL: "https://task-manager-fullstack-production-e830.up.railway.app/tasks", // Troque para o endereço do seu backend NestJS
});

export default api;
