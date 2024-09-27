import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productURL = "https://cookies-api-7996f284e7c0.herokuapp.com/api/v1/product";

  constructor(private http: HttpClient) { }

  public async getAll() {
    const products = await lastValueFrom(this.http.get(this.productURL));

    return products;
  }
}
