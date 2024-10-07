import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productURL = "http://localhost:3001/api/v1/product";
  products: any;

  constructor(private http: HttpClient) { }

  public async getAll() {
    const products = await lastValueFrom(this.http.get(this.productURL));

    this.products = products;

    return products;
  }
}
