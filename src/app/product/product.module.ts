import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProductModule {
}
