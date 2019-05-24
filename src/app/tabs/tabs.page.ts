import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';
import {Storage} from '@ionic/storage' ;
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {


nbr = 0 ;
constructor(private storage: Storage, private panierService: PanierService) {

}



ngOnInit() {


  this.storage.get('products').then(products => {
    if (products) {
      
      this.nbr = products.length

    } else { 
      this.nbr= 0 ;
              
      console.log('products not defined'); }
  });


  this.panierService.getPanier().subscribe(
    nbr => this.nbr = nbr
  )

}
}