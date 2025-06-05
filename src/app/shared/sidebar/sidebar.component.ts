import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Device } from '../../core/models/device';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() devices: Device[] = [];
  @Input() selectedDevice: Device | null = null;
  @Input() selectedDeviceId = '';
  @Output() selectedDeviceIdChange = new EventEmitter<string>();

  @Output() deviceFilter = new EventEmitter<void>();

  applyDeviceFilter(): void {
    this.deviceFilter.emit();
  }
}
