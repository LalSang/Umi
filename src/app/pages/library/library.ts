import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [],
  templateUrl: './library.html',
  styleUrls: ['./library.css']
})
export class Library implements OnInit {
  
  files: any[] = [];
  isDragging = false;

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
      this.loadFiles();
  }

  //Load files
  
  loadFiles() {
    this.fileService.getFiles().subscribe(data => {
      this.files = data;
    })
  }


  uploadFiles(fileList: FileList) {
    Array.from(fileList).forEach(file => {
      this.fileService.upload(file).subscribe(() => {
        this.loadFiles();
      })
    })
  }

  //Click / Input upload
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.uploadFiles(input.files);
    input.value = '';
  }

  //drag and drop handlers
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files) {
      this.uploadFiles(event.dataTransfer.files);
    }
  }

  

  downloadFile(file: any) {
    window.open(`http://localhost:3000/download/${file.name}`, "_blank");
  }

  deleteFile(file: any) {
    this.fileService.deleteFile(file.name).subscribe(()=>{
      this.loadFiles();
    })
  }

}
