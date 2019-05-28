import { Component, OnInit, Inject } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { switchMap } from 'rxjs/operators';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})

export class ProductDetailPage  implements OnInit { 
    product ;
    categorie= null ;
    id_qt ;
    constructor(private productService: ProduitsService, private route: ActivatedRoute, @Inject('baseURL') public baseURL
    , private panierService: PanierService, private categoriesService: CategoriesService) { }
    
      ngOnInit() {
    
        this.route.params.pipe(switchMap((params: Params) => {  return  this.productService.getProduct(params['id']); }) ) 
        .subscribe(product => this.handel(product));
    
        
      }
    
    handel(product) {
    
      this.product = product ;
    
  
    }
    
    AddToPanier(product) {

      this.panierService.setItem(product);
    }
    
    AddQT(id) {
    
    let QT = {"id_produit" : id , "quantite_produit" : 1 }
    console.log(QT);
      this.panierService.AjouterQuantiteProduit(QT).subscribe(qt =>{ 
        
        this.id_qt = <any> qt.id_qt ; this.AddToPanier(this.id_qt), console.log(qt)}
        ) ;
    }
    }
    