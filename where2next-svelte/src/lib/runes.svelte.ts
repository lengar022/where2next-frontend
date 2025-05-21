import type { Category, Forecast, PlacemarkSpecPlus } from "./types/where2next-types";

export const subTitle = $state({ text: "" });

export const loggedInUser = $state({ 
    email: "",
    name: "",
    token: "",
    _id: "",
    categoryId: "",
    categoryName: "",
 });

 export const selectedCategory = $state({ 
    _id: "",
    title: ""
}); 

export const selectedPlacemark = $state({ 
    _id: "",
    name: ""
});

export const weatherForecast = $state({ days: [] as Forecast[] });

export const currentCategories = $state({ categories: [] as Category[] });

export const currentPlacemarks = $state({ placemarks: [] as PlacemarkSpecPlus[] });

  
