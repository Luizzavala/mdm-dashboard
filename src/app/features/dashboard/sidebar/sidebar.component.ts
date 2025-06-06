import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeviceService } from '../../../core/services/device.service';
import { Device } from '../../../core/models/device';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  devices: Device[] = [];
  selectedId = 'all';

  @Output() deviceSelected = new EventEmitter<string>();

  constructor(private readonly deviceService: DeviceService) {}

  ngOnInit(): void {
    this.deviceService.getDevices().subscribe((devices) => {
      this.devices = devices;
    });
  }

  onSelectionChange(): void {
    this.deviceSelected.emit(this.selectedId);
  }
}
