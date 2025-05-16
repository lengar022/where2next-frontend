import type { Category } from "./types/where2next-types";

export const subTitle = $state({ text: "" });

export const loggedInUser = $state({ 
    email: "",
    name: "",
    token: "",
    _id: ""
 });

 export const selectedCategory = $state({ 
    _id: "",
    title: ""
});

export const currentCategories = $state({ categories: [] as Category[] });

  
