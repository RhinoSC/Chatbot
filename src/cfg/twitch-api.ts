import axios, { AxiosInstance, AxiosResponse } from 'axios';



export class twitchAPI {
    private API: AxiosInstance;
    private accessToken: string;
    private refshToken: string;
    // private interval: NodeJS.Timer;

    constructor() {
        this.accessToken = `${process.env.AUTH_TOKEN}`;
        this.refshToken = `${process.env.REFRESH_TOKEN}`;
        this.API = axios.create({
            baseURL: 'https://api.twitch.tv/helix/',
            headers: {
                'Client-ID': `${process.env.CLIENT_ID}`
            }
        })
    }

    async init() {
        try {
            let resp = await this.validateToken()
            if (!resp) {
                throw new Error('No response while validating token');
            }
        } catch (error) {
            await this.refreshToken();
        }
        console.log('[Twitch] Twitch API initialized successfully');
    }

    setAPI(API: AxiosInstance) {
        this.API = API;
    }

    public async validateToken(): Promise<{
        client_id: string; // eslint-disable-line camelcase
        login: string;
        scopes: string[];
        user_id: string; // eslint-disable-line camelcase
    }> {
        const response = await axios.get('https://id.twitch.tv/oauth2/validate', {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })

        if (response.status !== 200) {
            throw new Error(JSON.stringify(response.data));
            // Do we need to retry here?
        }
        return response.data;
    }

    public async refreshToken() {
        console.log('[Twitch] Attempting to refresh access token');

        const response = await axios.post('https://id.twitch.tv/oauth2/token', {
            grant_type: 'refresh_token',
            refresh_token: process.env.REFRESH_TOKEN,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
        })

        if (response.status !== 200) {
            throw new Error(JSON.stringify(response.data));
        }

        this.accessToken = response.data.access_token;
        this.refshToken = response.data.refresh_token;

        this.API.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`

        console.log('[Twitch] Successfully refreshed access token');
    }

    public async getGame(name: string) {
        let response = await this.API.get('games', { params: { name: name } })
        return response.data;
    }

    public async patchRequest(request: string, data: Object): Promise<AxiosResponse<any, any>> {
        let response = await this.API.patch(request, data);
        return response;
    }

    public async setStream(title: string, id: number) {
        let response = await this.patchRequest(`channels?broadcaster_id=${process.env.CHANNEL_ID}`, { title: title, game_id: id })
        return response.status;
    }

    public async setTitle(title: string) {
        let response = await this.patchRequest(`channels?broadcaster_id=${process.env.CHANNEL_ID}`, { title: title })
        return response.status;
    }

    public async setGame(id: number) {
        let response = await this.patchRequest(`channels?broadcaster_id=${process.env.CHANNEL_ID}`, { game_id: id })
        return response.status;
    }

}

