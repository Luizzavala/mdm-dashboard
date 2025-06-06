import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { Device } from '../../core/models/device';
import { DeviceService } from '../../core/services/device.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  devices: Device[] = [];
  selectedDevice: Device | null = null;
  selectedDeviceId = '';

  private map?: L.Map;
  private markers: L.Marker[] = [];

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((devices) => {
      this.devices = devices;
      this.renderMarkers();
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  applyDeviceFilter(): void {
    if (this.selectedDeviceId) {
      const device =
        this.devices.find((d) => d.id === this.selectedDeviceId) ?? null;
      this.selectedDevice = device;
    } else {
      this.selectedDevice = null;
    }
    this.renderMarkers();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [19.4326, -99.1332], // CDMX por defecto
      zoom: 6,
      minZoom: 3,
      maxZoom: 18,
      zoomControl: true, // Puedes desactivarlo si haces uno personalizado
      maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      tileSize: 256,
      maxZoom: 18,
    }).addTo(this.map);

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);
  }

  private renderMarkers(): void {
    if (!this.map) {
      return;
    }

    this.markers.forEach((m) => m.remove());
    this.markers = [];

    const devicesToShow = this.selectedDevice
      ? [this.selectedDevice]
      : this.devices;

    devicesToShow.forEach((device) => {
      const inactive = this.isInactive(device);
      const icon = L.icon({
        iconUrl: inactive ? 'assets/marker-red.png' : 'assets/marker-green.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      const marker = L.marker([device.lat, device.lng], { icon }).addTo(
        this.map!
      );
      const status = inactive ? 'Inactivo' : 'Activo';
      marker.bindPopup(
        `<strong>${device.name}</strong><br>` +
          `Última conexión: ${new Date(device.lastSeen).toLocaleString()}<br>` +
          `Estado: ${status}`
      );
      this.markers.push(marker);
    });
  }

  private isInactive(device: Device): boolean {
    const lastSeen = new Date(device.lastSeen).getTime();
    return Date.now() - lastSeen > 20 * 60 * 1000;
  }
}
