const BEARER_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

export const getBearerToken = () => {
    if (!BEARER_TOKEN) {
        console.error('Bearer token is not defined. Please check your .env file.');
    }
    return BEARER_TOKEN;
};