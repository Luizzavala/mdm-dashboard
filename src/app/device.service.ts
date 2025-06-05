import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Device {
  id: string;
  name: string;
  lastSeen: string;
}

export interface LocationPoint {
  lat: number;
  lng: number;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private apiUrl = 'http://localhost:3000'; // Ajuste según backend

  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}/devices`);
  }

  getDeviceHistory(id: string): Observable<LocationPoint[]> {
    return this.http.get<LocationPoint[]>(`${this.apiUrl}/devices/${id}/locations`);
  }
}
