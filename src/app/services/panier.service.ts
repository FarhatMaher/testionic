import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { baseURL } from 'src/shared/baseURL';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class PanierService {

  PanierList: Array<any>;

  constructor(private http: HttpClient , private storage: Storage ) { 
this.PanierList = [];

    storage.get('products').then(products => {
      if (products) {
        
        this.PanierList = products;
 
      } else { 
        this.PanierList = [];
                
        console.log('products not defined'); }
    });
  }

  
  private Panier = new Subject<number>();
  

    getPanier(): Observable<number> {
    return this.Panier.asObservable();
  }

  setItem(id: any) {
  
if(!this.existe(id, this.PanierList )) {
  
    this.PanierList.push(id);

    this.storage.set('products', this.PanierList);

   
    this.Panier.next(this.PanierList.length);
}
  }

  existe(id: number, m:any ): boolean {
    return m.some(el => el === id);
}


getProductsPanier() : Observable<Array<any>> {
var ids = JSON.parse(localStorage.getItem("products"));
      

  /*return <Observable<Array<any>>> forkJoin(
    ids.map(id => <Observable<any>> this.getProduct(id))).pipe(concatAll()); */

    return from(ids).pipe(
      concatMap(id => <Observable<any>> this.getProduct(id)))
    
}



getProduct(id):Observable<any> {

  return this.http.get(baseURL + 'dishes/' + id);
}

deletePanier(id , callback) {
  var ids = JSON.parse(localStorage.getItem("products"));
  let index = ids.indexOf(id);
  if (index >= 0) {
    ids.splice(index,1);
    localStorage.setItem('products', JSON.stringify(ids));
    this.Panier.next(ids.length);

    callback(null, ids)
  
  }
}

}
