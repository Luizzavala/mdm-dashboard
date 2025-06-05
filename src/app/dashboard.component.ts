import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { DeviceService, Device, LocationPoint } from './device.service';

interface DeviceWithStatus extends Device {
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  devices: DeviceWithStatus[] = [];
  selectedDevice?: DeviceWithStatus;
  history: LocationPoint[] = [];
  map?: L.Map;
  lastMarker?: L.Marker;

  constructor(private deviceService: DeviceService) {}

  ngOnInit() {
    this.loadDevices();
  }

  private loadDevices() {
    this.deviceService.getDevices().subscribe(devices => {
      this.devices = devices.map(d => ({
        ...d,
        status: this.isActive(d.lastSeen) ? 'active' : 'inactive'
      }));
    });
  }

  private isActive(lastSeen: string): boolean {
    const last = new Date(lastSeen);
    const diff = Date.now() - last.getTime();
    return diff <= 20 * 60 * 1000;
  }

  onSelectDevice() {
    if (!this.selectedDevice) return;
    this.deviceService.getDeviceHistory(this.selectedDevice.id).subscribe(history => {
      this.history = history;
      this.renderMap();
    });
  }

  private renderMap() {
    if (!this.history.length) return;
    if (!this.map) {
      this.map = L.map('map').setView([this.history[0].lat, this.history[0].lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);
    } else {
      this.map.setView([this.history[0].lat, this.history[0].lng], 13);
      this.map.eachLayer((layer: L.Layer) => {
        if ((layer as L.Marker).getLatLng) {
          this.map!.removeLayer(layer);
        }
      });
    }

    this.history.forEach(point => {
      L.circleMarker([point.lat, point.lng]).addTo(this.map!);
    });

    const last = this.history[this.history.length - 1];
    this.lastMarker = L.marker([last.lat, last.lng]).addTo(this.map!);
    this.lastMarker.bindPopup('Última posición').openPopup();
  }
}
