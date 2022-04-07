import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category-data';
import { Sound } from '../models/sound-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getSounds(): Observable<Sound[]> {
    return this.http.get<Sound[]>('http://localhost:3000/sounds');
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/categories');
  }

}
