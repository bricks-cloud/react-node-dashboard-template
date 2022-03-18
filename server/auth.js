const jwt = require('jsonwebtoken');
const { GoogleAuth } = require('google-auth-library');

const getGoogleAuthToken = async (targetAudience) => {
    const auth = new GoogleAuth();
    try {
        const { idTokenProvider } = await auth.getIdTokenClient(targetAudience);
        return await idTokenProvider.fetchIdToken(targetAudience);
    } catch (error) {
        console.error('Could not get the Google auth token credentials');
        return '';
    }
}

module.exports = class AuthProvider {
    constructor(audience) {
        this.audience = audience;
        this.token = "";
    }

    async getAuthHeader() {
        if (!this.isValidToken()) {
            this.token = await getGoogleAuthToken(this.BIMS_CLIENT_ID);
        }
        return { Authorization: `Bearer ${this.token}` };
    }

    isValidToken() {
        if (this.token === "") {
            return false;
        }
        const decodedToken = jwt.decode(this.token, { json: true });
        if (decodedToken === null) {
            console.log("Failed to decode token, Calling for new Google auth Token");
            return false;
        } else if (AuthProvider.hasTokenExpired(decodedToken["exp"] || 0)) {
            console.log("Auth Token Expired, Calling for new Google auth Token");

            return false;
        }

        return true;
    }

    static hasTokenExpired(expireTimestamp) {
        return expireTimestamp < Math.floor(new Date().getTime() / 1000);
    }
}