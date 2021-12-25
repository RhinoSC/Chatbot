import axios, { AxiosInstance, AxiosResponse } from 'axios';



export class twitchAPI {
    private API: AxiosInstance;
    private TOKEN: string;

    constructor() {
        this.TOKEN = `${process.env.AUTH_TOKEN}`;
        this.API = axios.create({
            baseURL: 'https://api.twitch.tv/helix/',
            headers: {
                'Client-ID': `${process.env.CLIENT_ID}`
            }
        })

        this.refreshToken().then((token) => {
            this.setAPI(axios.create({
                baseURL: 'https://api.twitch.tv/helix/',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Client-ID': `${process.env.CLIENT_ID}`
                }
            }))
            console.log('token actualizado');
        }).catch(err => {
            console.error(err);
        })
    }

    setAPI(API: AxiosInstance) {
        this.API = API;
    }

    public setToken(token: string) {
        this.TOKEN = token;
        return true;
    }

    public async generateToken() {
        let response = await axios.post('https://id.twitch.tv/oauth2/token', {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: process.env.CODE,
            grant_type: 'authorization_code',
            redirect_uri: process.env.BASE_URL
        })

        return response.data
    }

    public async refreshToken() {
        let response = await axios.post('https://id.twitch.tv/oauth2/token', {
            grant_type: 'refresh_token',
            refresh_token: process.env.REFRESH_TOKEN,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        })
        if (response.status == 400) {
            return response.statusText
        }
        this.setToken(response.data['access_token']);
        return response.data['access_token']
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

