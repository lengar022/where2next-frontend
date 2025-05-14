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

export interface Placemark {
  _id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  img: string;
  categoryid: string;
}

export interface Category {
  _id: string;
  title: string;
  img: string;
  userid: string;
  placemarks: Array<Placemark> | Array<string>;
}
