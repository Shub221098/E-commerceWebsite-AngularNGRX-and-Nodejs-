import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from './../store/app.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import { getCategories } from '../product/store/products.selector';
import { Products } from '../product/products.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories: string[];
  products: Products[];
  categorySel: string;
  arrangedProducts: any = {};
  catSub: Subscription;
  productSub: Subscription;
  images = [
    {
      img: 'https://img.freepik.com/premium-vector/online-shopping-concept-digital-marketing-website-mobile-application_43880-341.jpg?w=900',
    },
    {
      img: 'https://img.freepik.com/premium-vector/online-shopping-mobile-applications-websites-concepts_131114-28.jpg?w=900',
    },
    {
      img: 'https://as1.ftcdn.net/v2/jpg/04/65/46/52/1000_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg',
    },
    {
      img: 'https://img.freepik.com/free-vector/realistic-shopping-online-landing-page_23-2148532365.jpg?w=900&t=st=1682598210~exp=1682598810~hmac=1fce2f0869ec4874e488db9f5fc06524be1a75c9ef9e72b97aac818aa643f7c7',
    },
    {
      img: 'https://img.freepik.com/free-psd/banner-template-with-online-shopping_23-2148545455.jpg?w=1060&t=st=1682598226~exp=1682598826~hmac=dc4e5ca760b06ee9739edca07a95b466d8dc388df42314823ce0d2724f2ee4fb',
    },
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
  };
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    public route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.catSub = this.store.select(getCategories).subscribe((categories) => {
      this.categories = categories;
    });
    this.productSub = this.store
      .select('products')
      .subscribe((productState) => {
        this.products = productState.products;

        console.log('products', this.products)
        this.products.forEach((p: any) => {
          if (!this.arrangedProducts || !this.arrangedProducts[p.category]) {
            console.log(this.arrangedProducts[p.category]);
            this.arrangedProducts[p.category] = [p];
          } else {
            this.arrangedProducts[p.category].push(p);
          }
        });

        this.arrangedProducts = Object.keys(this.arrangedProducts).map(
          (key) => this.arrangedProducts[key]
        );
      });
  }
  onCategory() {
    console.log(this.categorySel);
    this.router.navigate(['/products'], {
      queryParams: { category: this.categorySel },
    });
  }
  ngOnDestroy() {
    this.catSub.unsubscribe();
    this.productSub.unsubscribe();
  }
}
