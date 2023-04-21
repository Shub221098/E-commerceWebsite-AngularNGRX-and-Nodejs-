import * as ShoppingListActions from 'src/app/shop/store/shopping-list.action';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import * as fromApp from '../../../store/app.reducer'
import { Store } from '@ngrx/store';
import { Shop } from '../../shop.model';
import { OrderItem } from '../../shop.model';
@Component({
  selector: 'app-shopping-cart-items',
  templateUrl: './shopping-cart-items.component.html',
})
export class ShoppingCartItemsComponent implements OnInit {
  @Input() item : OrderItem
  constructor(private store: Store<fromApp.AppState>) {}
    ngOnInit(){
      console.log(this.item)
    }

  removeItem(id : string) {
    this.store.dispatch(new ShoppingListActions.RemoveProductFromCart(id))
  }
  onIncrementCartItem(id : string) {
    this.store.dispatch(new ShoppingListActions.IncrementItemQuantity(id))
    
  }
  onDecrementCartItem(id : string) {
    this.store.dispatch(new ShoppingListActions.DecrementItemQuantity(id))
  }
}
