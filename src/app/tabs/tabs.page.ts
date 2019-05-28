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


  if (localStorage.getItem("products")) {
    this.nbr = JSON.parse(localStorage.getItem("products")).length;
    }
    this.panierService.getPanier().subscribe(
      nbr => this.nbr = nbr
    )


  this.panierService.getPanier().subscribe(
    nbr => this.nbr = nbr
  )

}

NotifyShop() {

  

 

}


}