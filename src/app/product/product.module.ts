import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';
import {StoreModule} from '@ngrx/store';
import {productReducer} from '../Core/Store/product/product.reducer';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {WithNgrxComponent} from './list/with-ngrx/with-ngrx.component';
import {WithoutNgrxComponent} from './list/without-ngrx/without-ngrx.component';
import {EffectsModule} from '@ngrx/effects';
import {ProductEffects} from '../Core/Store/product/product.effects';
import { AddWithNgrxComponent } from './add-with-ngrx/add-with-ngrx.component';
import { ConfirmModalNgrxComponent } from './confirm-modal-ngrx/confirm-modal-ngrx.component';


@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    ConfirmModalComponent,
    WithNgrxComponent,
    WithoutNgrxComponent,
    AddWithNgrxComponent,
    ConfirmModalNgrxComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    NgbNavModule
  ]
})
export class ProductModule {
}
