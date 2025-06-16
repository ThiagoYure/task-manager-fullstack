import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Troque para o endereço do seu backend NestJS
});

export default api;
