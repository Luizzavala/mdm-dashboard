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
      lat: 37.7749,
      lng: -122.4194,
      lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      name: 'Device B',
      lat: 40.7128,
      lng: -74.006,
      lastSeen: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      name: 'Device C',
      lat: 34.0522,
      lng: -118.2437,
      lastSeen: new Date().toISOString(),
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
