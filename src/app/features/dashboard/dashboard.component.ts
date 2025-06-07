import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../core/services/device.service';
import { Device } from '../../core/models/device';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  private map?: L.Map;
  private markers: Record<string, L.Layer> = {};
  devices: Device[] = [];
  selectedId = 'all';

  constructor(private readonly deviceService: DeviceService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadDevices();
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [24.8091, -107.394], // Culiacán, Sinaloa
      zoom: 13,
      minZoom: 3,
      maxZoom: 18,
      zoomControl: false,
      maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
      attributionControl: true,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      crossOrigin: true,
    }).addTo(this.map);

    requestAnimationFrame(() => {
      this.map?.invalidateSize();
    });
  }

  private loadDevices(): void {
    this.deviceService.getDevices().subscribe((devices) => {
      this.devices = devices;
      this.createMarkers();
    });
  }

  private createMarkers(): void {
    if (!this.map) return;
    this.devices.forEach((device) => {
      const lastSeen = new Date(device.lastSeen).getTime();
      const diff = Date.now() - lastSeen;
      const recent = diff <= 20 * 60 * 1000;
      const marker = L.circleMarker([device.lat, device.lng], {
        radius: 8,
        color: recent ? 'green' : 'red',
        fillColor: recent ? 'green' : 'red',
        fillOpacity: 1,
      });

      const tooltipContent = `${device.name} - Última conexión: ${new Date(
        device.lastSeen
      ).toLocaleString()}`;
      marker.bindTooltip(tooltipContent, { direction: 'top', sticky: true });
      this.markers[device.id] = marker;
    });
    this.updateMarkers();
  }

  onDeviceSelected(id: string): void {
    this.selectedId = id;
    this.updateMarkers();
  }


  private updateMarkers(): void {
    if (!this.map) return;
    Object.values(this.markers).forEach((m) => this.map!.removeLayer(m));

    if (this.selectedId === 'all') {
      Object.values(this.markers).forEach((m) => m.addTo(this.map!));
    } else {
      const marker = this.markers[this.selectedId];
      if (marker) {
        marker.addTo(this.map!);
        this.map!.setView((marker as any).getLatLng(), this.map.getZoom());
      }
    }
  }
}
