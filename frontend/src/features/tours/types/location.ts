export interface Location {
  name: string;
  description?: string;
  address: string;
  coordinates: [long: number, lat: number];
}
