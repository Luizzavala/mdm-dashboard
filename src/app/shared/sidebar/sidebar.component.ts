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
  @Input() positionLimit = 5;

  @Output() deviceFilter = new EventEmitter<void>();
  @Output() limitChange = new EventEmitter<number>();

  applyDeviceFilter(): void {
    this.deviceFilter.emit();
  }

  setLimit(limit: number): void {
    this.limitChange.emit(Number(limit));
  }
}
