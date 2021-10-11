import axios from "axios";

export class CommonService {
  protected readonly client;

  constructor() {
    this.client = axios.create({
      // timeout: 30000,
      // baseURL: `${window.location.origin}/api`,
      baseURL: process.env.VUE_APP_ONLINE_URL_API,
    });
  }
}
