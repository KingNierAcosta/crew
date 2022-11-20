import {Product} from '../../model/product.model';
import {createReducer, on} from '@ngrx/store';
import {deleteProductSuccess, loadProductsSuccess, saveProductSuccess} from './product.action';


export const initialState: ReadonlyArray<Product> = [];

export const productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, {products}) => {
    return products
  }),
  on(saveProductSuccess, (state) => {
    return {...state}
  }),
  on(deleteProductSuccess, (state) => {
    return {...state}
  }),
);
