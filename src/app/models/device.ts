export interface DevicePosition {
  lat: number;
  lng: number;
  timestamp: string;
}

export interface Device {
  id: number;
  name: string;
  positions: DevicePosition[];
}
