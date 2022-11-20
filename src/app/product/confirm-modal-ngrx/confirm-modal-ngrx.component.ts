import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../Core/model/product.model';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {filter} from 'rxjs/operators';
import {deleteProductAction, loadProductsAction} from '../../Core/Store/product/product.action';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../Core/Store/app/app.state';
import {selectAppStage} from '../../Core/Store/app/app.selector';
import {setAPIStatus} from '../../Core/Store/app/app.action';

@Component({
  selector: 'app-confirm-modal-ngrx',
  templateUrl: './confirm-modal-ngrx.component.html',
  styleUrls: ['./confirm-modal-ngrx.component.css']
})
export class ConfirmModalNgrxComponent implements OnInit {

  // @ts-ignore
  @Input() product: Product;

  constructor(private _modal: NgbActiveModal,
              private _store: Store,
              private _appStore: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  close() {
    this._modal.dismiss();
  }

  delete() {
    if (!this.product) return;

    this._store.dispatch(deleteProductAction({payload: this.product}));
    let appStatus$ = this._appStore.pipe(select(selectAppStage));
    appStatus$
      .pipe(filter(data => data.apiStatus === 'success'))
      .subscribe(() => {
        this._modal.dismiss();
        this._store.dispatch(loadProductsAction());
        this._appStore.dispatch(setAPIStatus({apiStatus: {loading: false, apiResponseMessage: '', apiStatus: ''}}))
      })
  }

}
