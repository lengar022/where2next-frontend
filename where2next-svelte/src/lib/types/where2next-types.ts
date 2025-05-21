export interface Session {
  name: string;
  _id: string;
  token: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  scope: string;
  _id?: string;
}

export interface PlacemarkSpec {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  categoryid: string;
}

export interface PlacemarkSpecPlus extends PlacemarkSpec{
  _id: string;
  img: string;
}

export interface Category {
  _id: string;
  title: string;
  img: string;
  userid: string;
  placemarks: Array<PlacemarkSpecPlus>;
}

export interface Forecast {
  day: string;
  icon: string;
  temp: number;
}

interface ConfigOptions {
  cloud?: "";
  url?: "";
}

// Global config options
export interface GlobalCloudinaryConfig extends ConfigOptions {
  analytics?: string;
  uploadPreset?: string;
  cloudName?: string;
  apiKey?: string;
}