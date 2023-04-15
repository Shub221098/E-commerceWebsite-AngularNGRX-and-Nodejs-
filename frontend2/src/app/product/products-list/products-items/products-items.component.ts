import { Router, ActivatedRoute } from '@angular/router';
import * as fromApp from './../../../store/app.reducer';
import { Products } from './../../products.model';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { getRole } from 'src/app/auth/store/auth.selector';

@Component({
  selector: 'app-products-items',
  templateUrl: './products-items.component.html',
  styleUrls: ['./products-items.component.css'],
})
export class ProductsItemsComponent {
  @Input() products: Products;
  @Input() index : number;
  admin : boolean = false;
  constructor(private store: Store<fromApp.AppState>, private router:Router, private route: ActivatedRoute) {
  }
  ngOnInit(){
    this.store.select(getRole)
      .subscribe((role) => {
        if (role === 'admin') {
            this.admin = true;
          }
        })
  }
  onDetail(){
   this.router.navigate([`${this.index}`],{relativeTo: this.route})
  }
  onCart(){
  }
  onDelete(){
    alert("Are you sure?")

  }
  onUpdate(){
    this.router.navigate([`edit/${this.index}`], { relativeTo: this.route });
  }
}
