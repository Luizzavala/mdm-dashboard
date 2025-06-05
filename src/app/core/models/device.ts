export interface Device {
  id: string;
  name: string;
  lat: number;
  lng: number;
  /** ISO timestamp of the last known connection */
  lastSeen: string;
}
