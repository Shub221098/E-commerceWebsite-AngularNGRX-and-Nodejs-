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
  @Input() items : OrderItem[]|null
  constructor(private store: Store<fromApp.AppState>) {}
    ngOnInit(){
    }

  removeItem(id : string) {
    if(this.items?.length ===1){
      this.items = null
      this.store.dispatch(new ShoppingListActions.UpdateCartAfterCheckout(this.items))
    }
    this.store.dispatch(new ShoppingListActions.RemoveProductFromCart(id))
  }
  onIncrementCartItem(id: string) {
    this.store.dispatch(new ShoppingListActions.IncrementItemQuantity(id))
    
  }
  onDecrementCartItem(id : string) {
    this.store.dispatch(new ShoppingListActions.DecrementItemQuantity(id))
  }
  onChange(event: any){

  }
}
