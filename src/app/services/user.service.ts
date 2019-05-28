import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseURL } from 'src/shared/baseURL';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  getUser (user: any): Observable<any> {
    const headers = new HttpHeaders(
      {
      'Content-Type': "text/plain",
    } );
   const body = "username="+user.username+"&password="+user.password+"&grant_type=password" ;
console.log(body);
    return this.http.post<any>(baseURL + `token`, body, {headers: headers});
             
    }
    isLoggedIn(): boolean {
  
       return (localStorage.getItem('token') !== null);
    }

    isAdmin(): boolean {

      return (localStorage.getItem('role')== 'admin');
    }
    
    addUser(user): Observable<any> {
      const headers = new HttpHeaders(
        {
        'Content-Type': 'application/json',
      } );
  
      return this.http.post<any>(baseURL + `users` , user, {headers: headers});
  
}
  
}