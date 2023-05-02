import { UsersService } from './user.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducer';
import * as UserActions from './store/user.action'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UsersComponent implements OnInit {
  users: any;
  userSub : Subscription
  constructor(private store :Store<fromApp.AppState>) {}
  ngOnInit() {
    // this.usersService.getAllUsers().subscribe((user: any) => {
    //   this.users = user;
    //   console.log(this.users);
    // });
    this.userSub = this.store.select('user').subscribe((user) => {
        this.users = user.user
        console.log(this.users)
    })
  }
  onActiveDeactive(id: string) {
    console.log(id)
    this.store.dispatch(new UserActions.UpdateUser(id))
  }
  ngOnDestroy(){
  }
}
