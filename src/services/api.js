import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// ── UI Components ──────────────────────────────────────────────────────────────

export const loginAdmin = (data) => api.post('/admin/login', data);
export const registerAdmin = (data) => api.post('/admin/register', data);
export const getAllUIs = () => api.get('/ui/all');
export const getUIById = (id, track = false) => api.get(`/ui/${id}${track ? '?track=true' : ''}`);
export const createUI = (data) => api.post('/admin/add', data);
export const deleteUI = (id) => api.delete(`/admin/delete/${id}`);
export const updateUI = (id, data) => api.put(`/admin/update/${id}`, data);

// ── Stats ──────────────────────────────────────────────────────────────────────
export const getStats = async () => {
  try {
    const response = await api.get('/ui/all');
    const uis = response.data;

    const totalViews = uis.reduce((sum, ui) => sum + (ui.views || 0), 0);
    const totalVisitors = Math.floor(totalViews * 0.8);

    return { data: { totalVisitors, totalViews } };
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

export default api;