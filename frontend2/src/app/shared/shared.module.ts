import { DropdownDirective } from './dropdown-directive';
import { FilterPipe } from './pipes/filter.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { PlaceHolderDirective } from './placeHolderDirective/placeholder.Directive';

@NgModule({
  declarations: [
    AlertComponent,
    PlaceHolderDirective,
    DropdownDirective,
    FilterPipe,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    PlaceHolderDirective,
    DropdownDirective,
    CommonModule,
    FilterPipe,
  ],
})
export class SharedModule {}
