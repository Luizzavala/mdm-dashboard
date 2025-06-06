import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
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
      center: [39.8282, -98.5795],
      zoom: 5
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
  }
}
