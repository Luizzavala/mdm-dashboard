import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  private map?: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
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
      zoomControl: true,
      maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      crossOrigin: true,
    }).addTo(this.map);

    requestAnimationFrame(() => {
      this.map?.invalidateSize();
    });
  }
}
