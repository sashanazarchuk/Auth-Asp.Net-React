export interface RegistrationData {
    username: string;
    email: string;
    age: number;
    phone: number;
    country: string;
    city: string;
    password: string;
}


export interface Country {
    countryId: number;
    name: string;
  }
  
  export interface City {
    countryId: number;
    cityId:number;
    name: string;
  }