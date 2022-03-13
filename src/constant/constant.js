
const PRODUCTION_ENV = 'my-app-nfhyx3cm5q-uc.a.run.app';
const LOCAL_ENV = 'localhost';

const envConstants = Object.freeze({
    [PRODUCTION_ENV]: Object.freeze({
        configurationURL: '',
    }),
    [LOCAL_ENV]: Object.freeze({
        configurationURL: '',
    }),
});

const geEnvConstants = () => {
    const specificEnvConstants =  envConstants[window.location.hostname];
    const defaultConstants = envConstants[LOCAL_ENV];
    return specificEnvConstants || defaultConstants;
};

export default geEnvConstants;