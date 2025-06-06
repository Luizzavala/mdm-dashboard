import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Device } from '../models/device';
// import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  // constructor(private http: HttpClient) {}

  /** Mocked device list */
  private readonly devices: Device[] = [
    {
      id: '1',
      name: 'Device A',
      lat: 24.8055,
      lng: -107.394,
      lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // hace 5 minutos
    },
    {
      id: '2',
      name: 'Device B',
      lat: 24.79,
      lng: -107.4265,
      lastSeen: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // hace 25 minutos
    },
    {
      id: '3',
      name: 'Device C',
      lat: 24.825,
      lng: -107.362,
      lastSeen: new Date().toISOString(), // ahora
    },
  ];

  /**
   * Retrieve available devices.
   * Replace the mocked return with `this.http.get<Device[]>(url)`
   * when integrating with a real API.
   */
  getDevices(): Observable<Device[]> {
    return of(this.devices);
  }
}
