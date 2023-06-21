import axios, { AxiosInstance } from "axios";

export class nodeCG {
    private baseURL: string = process.env.NODECG_URL as string;
    public axios: AxiosInstance;


    constructor() {
        console.log('este es: ', this.baseURL)
        this.axios = axios.create({
            baseURL: this.baseURL
            // baseURL: 'http://127.0.0.1:9090',
        })
    }
}

const nodecg = new nodeCG()

export default nodecg