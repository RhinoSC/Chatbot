import axios, { AxiosInstance } from "axios";

export class nodeCG {
    private baseURL: string = process.env.NODECG_URL as string;
    public axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: this.baseURL
        })
    }
}

const nodecg = new nodeCG()

export default nodecg