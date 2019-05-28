import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from 'src/shared/baseURL';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }


getAllCategories():Observable<any> {

  return this.http.get(baseURL + 'categories');
}

getCat(id:String):Observable<any> {

  return this.http.get(baseURL + `categories/${id}`)/*.pipe(
    map(cats => cats[0])) ;*/
}


postCategories(Categories): Observable<any> {
  const headers = new HttpHeaders({
    ContentType: "application/json",
    Authorization: "bearer " + localStorage.getItem('token')
  });
  return this.http.post(baseURL + "categories", Categories, { headers: headers });
}
putCategories(Categories): Observable<any> {
  const headers = new HttpHeaders({
    ContentType: "application/json",
    Authorization: "bearer " + localStorage.getItem('token')
  });

  return this.http.put(baseURL + "categories/" + Categories.id_catalogie, Categories, {
    headers: headers
  });
}
DeleteCategories(id): Observable<any> {
  const headers = new HttpHeaders({
    ContentType: "application/json",
    Authorization: "bearer " + localStorage.getItem('token')
  });

  return this.http.delete(baseURL + "categories/" + id, { headers: headers });
}

PostImage(file): Observable<any> {
  const formData: any = new FormData();
  const headers = new HttpHeaders({
 
    Authorization: "bearer " + localStorage.getItem('token')
  });
  formData.append("file", file);

  return this.http.post(
    baseURL + `photos`,
    formData , {headers: headers}
  );
}
}