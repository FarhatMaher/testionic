import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from 'src/shared/baseURL';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor(private http: HttpClient) { }


  getAllProducts():Observable<any> {
  
    return this.http.get(baseURL + 'dishes');
  }
  
  getProductsWithIdCategorie(IdCategorie: String):Observable<any> {
  
    return this.http.get(baseURL + `dishes?catid=${IdCategorie}`);
  }
  
  getProduct(id):Observable<any> {
  
    return this.http.get(baseURL + 'dishes/' + id);
  }
}
