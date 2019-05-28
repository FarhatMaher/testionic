import { Component, Inject, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { PanierService } from '../services/panier.service';
import { Observable, Observer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { UsersService } from '../services/user.service';
import { listLazyRoutes, parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {



  shops = [] ;
  total = 0 ;
  time ;
  quantite  = [
    {value: '1', viewValue: '1' , selected: true},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
    {value: '6', viewValue: '6'},
    {value: '7', viewValue: '7'},
    {value: '8', viewValue: '8'},
    {value: '9', viewValue: '9'}
  ];
  selectedQ: String;

// quantite: ['1', '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9' , '10' ];
  constructor(private shopService: PanierService, @Inject('baseURL') public baseURL, 
  private userService: UsersService ,     public modal: ModalController ) { }

  ngOnInit() {

 this.shopService.getIQPanier().subscribe(
 products => 
 {this.shops.push(products) ;  this.total = 
  this.total +(products.Produit.prix * products.quantite_produit)  } 
   )
  }

  

deletePanier(id) {
 
  this.shops = [] ;
this.shopService.deletePanier(id , (error , data) => {

  if(data) {

    this.shops = [];
    this.total = 0
  this.shopService.getIQPanier().subscribe(
      products =>{  
      this.shops.push(products)   ;this.total = this.total +(products.Produit.prix * products.quantite_produit)  }
);
  }
}) ;}


AddPanier() {


if(this.userService.isLoggedIn()) {

let panier: any = {"prixtotal" : this.total , "id_client" : localStorage.getItem("id_client") } ;


  this.shopService.PostPanier(panier).pipe(switchMap(panier => {
 
    
   return this.shopService.updateQTproduit(panier.id_panier)  } )).subscribe(
       next => {localStorage.removeItem("products") ; this.shops = []; this.total = 0; 
      
      this.shopService.notifyPanier()}

    )
}


else {
this.openLogin() ;
  
   }
}

UpdateQT(id, nvQ) {

  
   this.shopService.updateQTproduitQT(id, nvQ).pipe(switchMap(data => 
      
       { this.total = 0 ; return  this.shopService.getIQPanier()} )).subscribe(
        products => {  
         
          
          this.total = this.total +(products.Produit.prix * products.quantite_produit) 
        
        } 
          ) ;
  }



  async openLogin()
  {
     const modalPage = await this.modal.create({
      component: LoginPage
    });

    return await modalPage.present();
  }

  verif(a, b )
  {
    console.log(a==b);
    return  a == b ;
  }


}
