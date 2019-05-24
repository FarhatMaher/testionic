import { Component, OnInit, Inject } from '@angular/core';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
categories: [] = [];
constructor(private categorieService: CategoriesService ,
  @Inject('baseURL') protected baseURL ) {}
  
  ngOnInit() {
    this.categorieService.getAllCategories()
      .subscribe(categories => this.categories = categories,
      )
  }


}