
import axios from './client';

export const testGet = async (infra) => {
    await axios.get(`/api/create/${infra}`);
};