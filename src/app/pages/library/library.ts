import { Component, OnInit } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-library',
  imports: [],
  templateUrl: './library.html',
  styleUrl: './library.scss',
})
export class Library implements OnInit {
  
  files: any[] = [];

  constructor(private fileService: FileService) {

  }

  ngOnInit() {
      this.loadFiles();
  }

  loadFiles() {
    this.fileService.getFiles().subscribe(data => {
      this.files = data;
    })
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.fileService.upload(file).subscribe(()=> {
      this.loadFiles();
    })
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
