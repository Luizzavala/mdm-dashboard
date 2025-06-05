import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Device, DevicePosition } from '../models/device';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  devices: Device[] = [
    {
      id: 1,
      name: 'Device A',
      positions: [
        { lat: 37.7749, lng: -122.4194, timestamp: '2024-06-01T12:00:00Z' },
        { lat: 37.775, lng: -122.42, timestamp: '2024-06-01T13:00:00Z' },
        { lat: 37.776, lng: -122.421, timestamp: '2024-06-01T14:00:00Z' }
      ]
    },
    {
      id: 2,
      name: 'Device B',
      positions: [
        { lat: 40.7128, lng: -74.0060, timestamp: '2024-06-01T12:00:00Z' },
        { lat: 40.7138, lng: -74.005, timestamp: '2024-06-01T13:00:00Z' },
        { lat: 40.7148, lng: -74.004, timestamp: '2024-06-01T14:00:00Z' }
      ]
    }
  ];

  selectedDevice: Device | null = null;
  selectedDeviceId = '';
  positionLimit = 5;

  private map?: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  selectDevice(device: Device): void {
    this.selectedDevice = device;
    this.positionLimit = 5;
    this.renderPositions();
  }

  applyDeviceFilter(): void {
    if (this.selectedDeviceId) {
      const id = Number(this.selectedDeviceId);
      const device = this.devices.find(d => d.id === id) ?? null;
      this.selectedDevice = device;
    } else {
      this.selectedDevice = null;
    }
    this.positionLimit = 5;
    this.renderPositions();
  }

  setLimit(limit: number): void {
    this.positionLimit = limit;
    this.renderPositions();
  }

  private initMap(): void {
    this.map = L.map('map').setView([37.7749, -122.4194], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.renderPositions();
  }

  private renderPositions(): void {
    if (!this.map) {
      return;
    }

    this.map.eachLayer(layer => {
      if ((layer as any).remove && !(layer instanceof L.TileLayer)) {
        (layer as any).remove();
      }
    });

    const devicesToShow = this.selectedDevice ? [this.selectedDevice] : this.devices;

    devicesToShow.forEach(device => {
      const positions = device.positions.slice(-this.positionLimit);
      positions.forEach(pos => {
        L.marker([pos.lat, pos.lng]).addTo(this.map!).bindPopup(
          `${device.name} - ${new Date(pos.timestamp).toLocaleString()}`
        );
      });
    });
  }
}
