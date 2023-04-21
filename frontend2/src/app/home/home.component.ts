import { Router } from '@angular/router';
import { AppState } from './../store/app.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import { getCategories } from '../product/store/products.selector';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: string[];
  clickCat : string
  categorySel : string
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}
  ngOnInit() {
    this.store.select(getCategories).subscribe((categories) => {
      this.categories = categories;
    });
  }
  onCategory(){
    console.log(this.categorySel)
    this.router.navigate(['/products'], { queryParams: {category: this.categorySel}});
  }
}
