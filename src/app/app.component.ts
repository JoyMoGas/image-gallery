import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Photo {
  id: string;
  url: string;
  title: string;
  likes: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  photos: Photo[] = [];
  newPhotoUrl: string = '';
  newPhotoTitle: string = '';

  ngOnInit() {
    this.loadPhotos();
  }

  get totalLikes(): number {
    return this.photos.reduce((total, photo) => total + photo.likes, 0);
  }

  addPhoto() {
    if (!this.newPhotoUrl || !this.newPhotoTitle) return;

    const newPhoto: Photo = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      url: this.newPhotoUrl,
      title: this.newPhotoTitle,
      likes: 0
    };

    this.photos.unshift(newPhoto);
    this.savePhotos();
    
    this.newPhotoUrl = '';
    this.newPhotoTitle = '';
  }

  likePhoto(id: string) {
    const photo = this.photos.find(p => p.id === id);
    if (photo) {
      photo.likes++;
      this.savePhotos();
    }
  }

  deletePhoto(id: string) {
    this.photos = this.photos.filter(p => p.id !== id);
    this.savePhotos();
  }

  private savePhotos() {
    localStorage.setItem('gallery_photos', JSON.stringify(this.photos));
  }

  private loadPhotos() {
    const saved = localStorage.getItem('gallery_photos');
    if (saved) {
      this.photos = JSON.parse(saved);
    } else {
      this.photos = [
        {
          id: '1',
          url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          title: 'Oficina Minimalista',
          likes: 5
        },
        {
          id: '2',
          url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          title: 'Espacio de Trabajo',
          likes: 12
        }
      ];
      this.savePhotos();
    }
  }
}
