import axios from "axios";
import type { Session, User, Category } from "$lib/types/where2next-types";

export const where2nextService = {
  baseUrl: "http://localhost:3000",

  async signup(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return response.data.success === true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async login(email: string, password: string): Promise<Session | null> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });
      if (response.data.success) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
        const session: Session = {
          name: response.data.name,
          token: response.data.token,
          _id: response.data._id
        };
        return session;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async createCategory(title: string, userid: string, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(`${this.baseUrl}/api/categories`, { title, userid });
      return response.status == 201;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getUserCategories(userid: string, token: string): Promise<Category[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/categories/user/${userid}`);
      return response.data;
    } catch (error) {
    console.log(error);
      return [];
    }
  },  

  async getCategoryById(id: string, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/categories/${id}`);
      return response.data;
    } catch (error) {
    console.log(error);
      return null;
    }
  },  

  async getAllCategories(token: string): Promise<Category[]> {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/categories`);
      return response.data;
    } catch (error) {
    console.log(error);
      return [];
    }
  },
};
