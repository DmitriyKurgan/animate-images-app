import { Injectable } from '@angular/core';

@Injectable()
export class FileService {

  constructor() { }

  downloadFile(filename: string, content: string, contentType: string) {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
  }
}
