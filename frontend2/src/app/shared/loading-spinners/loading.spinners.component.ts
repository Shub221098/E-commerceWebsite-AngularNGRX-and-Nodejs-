import { Component } from '@angular/core';
@Component({
  selector: 'app-loading-spinner',
  template: '<div class="backdrop"></div><div class="loading-spinner"><div class="lds-circle"><div></div></div><div>Loading Data</div></div>',
  styleUrls: ['./loading.spinners.component.css'],
})
export class LoadingSpinnerComponent {}
