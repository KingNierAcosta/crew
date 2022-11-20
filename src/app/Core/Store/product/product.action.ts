import {createAction, props} from '@ngrx/store';
import {Product} from '../../model/product.model';


export const loadProductsAction = createAction(
  '[Product] load product action'
)


export const loadProductsSuccess = createAction(
  '[Product] load products success',
  props<{ products: Product[] }>()
)


export const saveProductAction = createAction(
  '[Product] save product action',
  props<{ payload: Product }>()
)

export const saveProductSuccess = createAction(
  '[Product] save product success',
)

export const deleteProductAction = createAction(
  '[Product] delete product action',
  props<{ payload: Product }>()
)

export const deleteProductSuccess = createAction(
  '[Product] delete product success'
)
