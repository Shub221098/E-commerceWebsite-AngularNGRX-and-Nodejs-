import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown-directive'
import { PlaceHolderDirective } from './placeHolderDirective/placeholder.Directive';

@NgModule({
  declarations: [
    DropdownDirective,
    AlertComponent,
    PlaceHolderDirective,
  ],
  imports: [CommonModule],
  exports: [
    DropdownDirective,
    AlertComponent,
    PlaceHolderDirective,
    CommonModule,
  ],
})
export class SharedModule {}
