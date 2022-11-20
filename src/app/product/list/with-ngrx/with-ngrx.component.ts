import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectProducts} from '../../../Core/Store/product/product.selector';
import {loadProductsAction} from '../../../Core/Store/product/product.action';
import {Product} from '../../../Core/model/product.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddWithNgrxComponent} from '../../add-with-ngrx/add-with-ngrx.component';
import {ConfirmModalNgrxComponent} from '../../confirm-modal-ngrx/confirm-modal-ngrx.component';

@Component({
  selector: 'app-with-ngrx',
  templateUrl: './with-ngrx.component.html',
  styleUrls: ['./with-ngrx.component.css']
})
export class WithNgrxComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'serial_number', 'actions'];
  products$ = this._store.pipe(select(selectProducts));

  constructor(
    private _store: Store,
    private _ngbModal: NgbModal
  ) {
  }

  addProduct(product?: Product) {
    const modalRef = this._ngbModal.open(AddWithNgrxComponent);
    if (product) modalRef.componentInstance.product = product;

  }

  deleteProduct(product: Product) {
    const modalRef = this._ngbModal.open(ConfirmModalNgrxComponent);
    modalRef.componentInstance.product = product;
  }

  ngOnInit(): void {
    this._store.dispatch(loadProductsAction());
  }
}
