import { ShoppingCartEffects } from './shop/store/shopping-list.effects';
import { ProductsEffects } from './product/store/products.effects';
import { CoreModule } from './core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromApp from './store/app.reducer';
import { AuthEffects } from './auth/store/auth.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environment/environment.prod';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { UsersEffects } from './users/store/user.effects';
@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    SlickCarouselModule,
    FormsModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects, ProductsEffects, ShoppingCartEffects,UsersEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
