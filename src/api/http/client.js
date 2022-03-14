import axios from 'axios';
import getEnvConstants from '../../constant/constant';

const getAuthToken = async () => {
  let token = '';

  try {
    const { data } = await axios.get('http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=' + getEnvConstants().configurationURL, {
      headers: {
        'Metadata-Flavor': 'Google'
      },
    });
    token = data;
  } catch (error) {
    console.error(error);
  } finally {
    console.log(token);
    return token;
  };
};

const instance = axios.create({
  baseURL: getEnvConstants().configurationURL,
  headers: { 'Authorization': 'Bearer ' + getAuthToken() },
});

export default instance;