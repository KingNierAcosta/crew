import {createFeatureSelector} from '@ngrx/store';
import {Product} from '../../model/product.model';

export const selectProducts = createFeatureSelector<Product[]>('products');

