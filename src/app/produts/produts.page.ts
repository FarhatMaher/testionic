import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProduitsService } from '../services/produits.service';
import { CategoriesService } from '../services/categories.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-produts',
  templateUrl: './produts.page.html',
  styleUrls: ['./produts.page.scss'],
})
export class ProdutsPage implements OnInit {

  products: [] ;
  categorieId ;
  categorie
    constructor(private productService: ProduitsService, @Inject('baseURL') public baseURL 
    , private route: ActivatedRoute , private categoriesService: CategoriesService) { }
  
    ngOnInit() {
  
      this.route.params.pipe(switchMap((params: Params) => { this.categorieId=  params['catid'] ; return  this.productService.getProductsWithIdCategorie(params['catid']); }) )
      .subscribe(products => this.handel(products));
  
  
    }
    handel(products) {
      this.products = <any> products
  
  
    }

}
