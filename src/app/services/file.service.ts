import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  
  private apiUrl = "http://localhost:3000"; //backend will run here

  constructor(private http:HttpClient) {}

  upload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.get<any[]>(`${this.apiUrl}/files`);
  }

  getFiles() {
    return this.http.get<any[]>(`${this.apiUrl}/files`);
  }

  deleteFile(name : string) {
    return this.http.get<any[]>(`${this.apiUrl}/files/${name}`);
  }


}
