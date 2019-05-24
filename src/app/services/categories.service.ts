import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { Observable } from 'rxjs';
import { baseURL } from 'src/shared/baseURL';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

 
  constructor(private http: HttpClient) { }


getAllCategories():Observable<any> {

  return this.http.get(baseURL + 'categories');
}

getCat(id:String):Observable<any> {

  return this.http.get(baseURL + `categories?id=${id}`).pipe(
    map(dishes => dishes[0])) ;
}
}

