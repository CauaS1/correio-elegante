import axios from 'axios';
import { API_IP } from '@env';

export const api = axios.create({
  baseURL: API_IP
})