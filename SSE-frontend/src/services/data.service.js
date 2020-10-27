import axios from 'axios';
export const BASE_URL = 'http://localhost:8000/';
const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export const getAssets = async () => {
    const response = await axiosInstance.get('assets');
    return response.data;
}

export const subscribeToUpdates = async (cb, dispatch) => {
    const events = new EventSource(`${BASE_URL}stream`);
    events.onmessage = (e) => cb(e, dispatch);
}
