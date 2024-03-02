import axios from "axios";

const BASE_URL = "https://tyradex.vercel.app/api/v1/";

export class PokemonAPI {
  static async fetchList() {
    const response = await axios.get(`${BASE_URL}gen/1`);
    return response.data;
  }

  static async fetchById(id) {
    const response = await axios.get(`${BASE_URL}pokemon/${id}`);
    return response.data;
  }
}
