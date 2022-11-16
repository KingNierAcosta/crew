import {Injectable} from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc} from '@angular/fire/firestore';
import {Product} from '../model/product.model';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  path = 'products';

  constructor(private _firestore: Firestore) {
  }

  /**
   * Add products to the list
   *
   * @param product {Product} product to add
   * */
  addProduct(product: Product) {
    const productRef = collection(this._firestore, this.path);
    return from(addDoc(productRef, product))
  }

  /**
   * Edit a product from the list
   *
   * @param product {Product} product to update
   * */
  updateProduct(product: Product) {
    const productDocRef = doc(this._firestore, `${this.path}/${product.id}`);
    return from(updateDoc(productDocRef, {...product}));
  }

  /**
   * Get a list of all products
   *
   * @return product[] {Observable<Product[]>}
   * */
  getProducts(): Observable<Product[]> {
    const productRef = collection(this._firestore, this.path);
    return collectionData(productRef, {idField: 'id'}) as Observable<Product[]>;
  }

  /**
   * Remove a product from the list
   *
   * @param product {Product} product to update
   * */
  deleteProduct(product: Product) {
    const productDocRef = doc(this._firestore, `${this.path}/${product.id}`);
    return from(deleteDoc(productDocRef));
  }

}
