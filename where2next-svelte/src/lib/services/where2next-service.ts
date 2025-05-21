import axios from "axios";
import type { Session, User, Category, PlacemarkSpec } from "$lib/types/where2next-types";
import { loggedInUser, currentCategories, selectedCategory } from "$lib/runes.svelte";

export const where2nextService = {
  baseUrl: "http://localhost:3000",

  saveSession(session: Session, email: string) {
    loggedInUser.email = email;
    loggedInUser.name = session.name;
    loggedInUser.token = session.token;
    loggedInUser._id = session._id;
    localStorage.where2next = JSON.stringify(loggedInUser);
  },

  saveSessionWithCategory(id: string, name: string) {
    loggedInUser.categoryId = id;
    loggedInUser.categoryName = name;
    localStorage.where2next = JSON.stringify(loggedInUser);
  },

  async restoreSession() {
    const savedLoggedInUser = localStorage.where2next;
    if (savedLoggedInUser) {
      const session = JSON.parse(savedLoggedInUser);
      loggedInUser.email = session.email;
      loggedInUser.name = session.name;
      loggedInUser.token = session.token;
      loggedInUser._id = session._id;
      loggedInUser.categoryId = session.categoryId;
      loggedInUser.categoryName = session.categoryName;
    }
    await this.refreshWhere2NextInfo();
  },

  clearSession() {
    currentCategories.categories = [];
    loggedInUser.email = "";
    loggedInUser.name = "";
    loggedInUser.token = "";
    loggedInUser._id = "";
    loggedInUser.categoryId = "";
    loggedInUser.categoryName = "";
    localStorage.removeItem("where2next");
  },

  async refreshWhere2NextInfo() {
    if (loggedInUser.token) {
      currentCategories.categories = await this.getUserCategories(loggedInUser._id, loggedInUser.token);
      selectedCategory._id = loggedInUser.categoryId;
    }
  },

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
        this.saveSession(session, email);
        await this.refreshWhere2NextInfo();
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
      await this.refreshWhere2NextInfo();
      return response.status == 201;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async updateCategoryImage(id: string, url: string, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(`${this.baseUrl}/api/categories/${id}/imageurl`, { url });
      await this.refreshWhere2NextInfo();
      return response.status == 201;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async deleteCategory(id: string, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      await axios.delete(`${this.baseUrl}/api/categories/${id}/imageurl`);
      const response = await axios.delete(`${this.baseUrl}/api/categories/${id}`);
      await this.refreshWhere2NextInfo();
      return response.status == 204;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async deleteCategoryImage(id: string, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.delete(`${this.baseUrl}/api/categories/${id}/imageurl`);
      await this.refreshWhere2NextInfo();
      return response.status == 204;
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

  async createPlacemark(placemark: PlacemarkSpec, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      console.log(`Adding placemark ${placemark.name} to category id ${placemark.categoryid}`);
      const response = await axios.post(`${this.baseUrl}/api/categories/${placemark.categoryid}/placemarks`, placemark);
      await this.refreshWhere2NextInfo();
      if (response.status == 201) {
      return response.data;
      } else {
      return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getPlacemarksByCategory(id: string, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/placemarks/category/${id}`);
      return response.data;
    } catch (error) {
    console.log(error);
      return null;
    }
  },  

  async deletePlacemark(id: string, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      await axios.delete(`${this.baseUrl}/api/placemarks/${id}/imageurl`);
      const response = await axios.delete(`${this.baseUrl}/api/placemarks/${id}`);
      await this.refreshWhere2NextInfo();
      return response.status == 204;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async updatePlacemarkImage(id: string, url: string, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.post(`${this.baseUrl}/api/placemarks/${id}/imageurl`, { url });
      await this.refreshWhere2NextInfo();
      return response.status == 201;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async deletePlacemarkImage(id: string, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.delete(`${this.baseUrl}/api/placemarks/${id}/imageurl`);
      await this.refreshWhere2NextInfo();
      return response.status == 204;
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getPlacemarkForecast(id: string, token: string) {
    try {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      const response = await axios.get(`${this.baseUrl}/api/placemarks/${id}/weather`);
      return response.data;
    } catch (error) {
    console.log(error);
      return null;
    }
  },  
};
