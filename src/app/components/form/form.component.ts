import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  form: FormGroup;
  imageUrl: string | undefined;

  constructor(
    private fb: FormBuilder,
    private fileService: FileService
  ) {
    this.form = this.fb.group({
      image: [''],
      animation: [''],
      imageSize: [''],
      containerWidth: [''],
      containerHeight: [''],
      imagePositionX: [''],
      imagePositionY: [''],
      container: ['']
    });
  }

  onSubmit() {
    const html = `
      <html>
        <head>
          <title>Animated Image</title>
          <style>
            .container {
              width: ${this.form.value.containerWidth}px;
              height: ${this.form.value.containerHeight}px;
              position: relative;
              overflow: hidden;
            }
            img {
              width: ${this.form.value.imageSize}px;
              position: absolute;
              left: ${this.form.value.imagePositionX}px;
              top: ${this.form.value.imagePositionY}px;
              animation-name: ${this.form.value.animation};
              animation-duration: 2s;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="${this.imageUrl}" *ngIf="imageUrl" class="preview-image">
          </div>
        </body>
      </html>
    `;

    this.fileService.downloadFile('animated-image.html', html, 'text/html');
  }

  onImageChange(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onDownload() {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .animated-image {
              animation: ${this.form.value.animation} 2s;
              width: ${this.form.value.imageSize}px;
              height: ${this.form.value.imageSize}px;
              position: absolute;
              top: ${this.form.value.imagePositionY}px;
              left: ${this.form.value.imagePositionX}px;
            }
            @keyframes zoom-in-from-above {
              from { transform: scale(0); }
              to { transform: scale(1); }
            }
            @keyframes zoom-out-from-below {
              from { transform: scale(2); }
              to { transform: scale(1); }
            }
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slide-in-from-left {
              from { left: -100%; }
              to { left: ${this.form.value.containerWidth}px; }
            }
          </style>
        </head>
        <body>
          <div style="width: ${this.form.value.containerWidth}px; height: ${this.form.value.containerHeight}px; position: relative;">
             <img src="${this.imageUrl}" *ngIf="imageUrl" class="animated-image">
          </div>
        </body>
      </html>
    `;


    const file = new Blob([htmlContent], { type: 'text/html' });
    const fileUrl = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'animated-image.html';
    a.click();
  }
}
