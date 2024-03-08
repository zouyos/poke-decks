import axios from "axios";

const BASE_URL = "https://tyradex.vercel.app/api/v1";

export class PokemonAPI {
  static async fetchByGen(gen) {
    const response = await axios.get(`${BASE_URL}/gen/${gen}`);
    return response.data;
  }

  static async fetchAll() {
    const response = await axios.get(`${BASE_URL}/pokemon`);
    return response.data;
  }
}
