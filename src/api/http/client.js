import axios from 'axios';
import getEnvConstants from '../../constant/constant';

const instance = axios.create({
  baseURL: getEnvConstants().configurationURL,
});

export default instance;