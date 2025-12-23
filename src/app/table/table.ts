import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { SharedFile } from '../models/file.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() files: SharedFile[] = [];

  formatSize(bytes: number): string {
    if (!bytes) return '-';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
}
