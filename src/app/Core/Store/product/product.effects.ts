import {Injectable} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  deleteProductAction,
  deleteProductSuccess,
  loadProductsAction,
  loadProductsSuccess,
  saveProductAction,
  saveProductSuccess
} from './product.action';
import {map, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../app/app.state';
import {setAPIStatus} from '../app/app.action';

@Injectable()
export class ProductEffects {

  constructor(
    private _actions$: Actions,
    private _productService: ProductService,
    private _appStage: Store<AppState>
  ) {
  }


  loadProducts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadProductsAction),
      switchMap(() => {
        return this._productService.getProducts()
          .pipe(map((data) => loadProductsSuccess({products: data})))
      })
    ))

  saveProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(saveProductAction),
      switchMap(({payload}) => {
        this._appStage.dispatch(setAPIStatus({apiStatus: {loading: true, apiResponseMessage: '', apiStatus: ''}}))
        return !payload.id
          ? this._productService.addProduct(payload)
            .pipe(map(() => {
              this._appStage.dispatch(setAPIStatus({
                apiStatus: {
                  loading: false,
                  apiResponseMessage: '',
                  apiStatus: 'success'
                }
              }))
              return saveProductSuccess();
            }))
          : this._productService.updateProduct(payload)
            .pipe(map(() => {
              this._appStage.dispatch(setAPIStatus({
                apiStatus: {
                  loading: false,
                  apiResponseMessage: '',
                  apiStatus: 'success'
                }
              }))
              return saveProductSuccess();
            }))
      })
    )
  )

  deleteProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(deleteProductAction),
      switchMap(({payload}) => {
        this._appStage.dispatch(setAPIStatus({apiStatus: {loading: true, apiResponseMessage: '', apiStatus: ''}}))
        return this._productService.deleteProduct(payload)
          .pipe(map(() => {
            this._appStage.dispatch(setAPIStatus({
              apiStatus: {
                loading: false,
                apiResponseMessage: '',
                apiStatus: 'success'
              }
            }))
            return deleteProductSuccess();
          }))
      })
    )
  )

}
