import { ToastrService } from 'ngx-toastr';
import * as ShoppingListActions from 'src/app/shop/store/shopping-list.action';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
  valid : boolean = true
  constructor(private store: Store<fromApp.AppState>, private toastr : ToastrService) {}
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
    if (+event.target.value > +event?.target.max) {
      this.showWarning(
        `Quantity must not be greater than ${event?.target.max}`
      );
      event.target.value = 1;
    }
    if(event.target.value === ''){
      this.valid = false
      this.showWarning('Quantity must be required')
    }
    const regex="[1-9][0-9]*"
    if(!regex.includes(event.target.value)){
      this.valid = false
      this.showWarning('Quantity must be a positive number')
    }
  }
  showWarning(message: string) {
    this.toastr.warning(message);
  }

}
