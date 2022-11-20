import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../Core/services/product.service';
import {Product} from '../../Core/model/product.model';
import {select, Store} from '@ngrx/store';
import {saveProductAction} from '../../Core/Store/product/product.action';
import {AppState} from '../../Core/Store/app/app.state';
import {selectAppStage} from '../../Core/Store/app/app.selector';
import {setAPIStatus} from '../../Core/Store/app/app.action';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-add-with-ngrx',
  templateUrl: './add-with-ngrx.component.html',
  styleUrls: ['./add-with-ngrx.component.css'],
  providers: [FormBuilder]
})
export class AddWithNgrxComponent implements OnInit {

  // @ts-ignore
  @Input() product: Product;
  // @ts-ignore
  form: FormGroup;

  constructor(public modal: NgbActiveModal,
              private _fb: FormBuilder,
              private _productService: ProductService,
              private _store: Store,
              private _appStore: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      id: [],
      name: [null, Validators.required],
      price: [null, Validators.required],
      serial_number: [null],
    });

    if (this.product) this.form.patchValue(this.product);
  }

  // @ts-ignore
  handleSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    this._store.dispatch(saveProductAction({payload: {...this.form.value}}))
    let appStatus$ = this._appStore.pipe(select(selectAppStage));
    appStatus$
      .pipe(filter(data => data.apiStatus === 'success'))
      .subscribe(data => {
        this.modal.close();
        this._appStore.dispatch(setAPIStatus({apiStatus: {loading: false, apiResponseMessage: '', apiStatus: ''}}))
      })
  }

}
