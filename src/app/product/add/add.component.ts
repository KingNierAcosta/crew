import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {catchError, finalize, takeUntil, tap} from 'rxjs/operators';
import {of, Subject} from 'rxjs';
import {ProductService} from '../../Core/services/product.service';
import {Product} from '../../Core/model/product.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [FormBuilder]
})
export class AddComponent implements OnInit, OnDestroy {

  // @ts-ignore
  @Input() product: Product;
  // @ts-ignore
  form: FormGroup;
  isLoading: boolean = false;
  destroy$ = new Subject<boolean>();

  constructor(public modal: NgbActiveModal,
              private _fb: FormBuilder,
              private _productService: ProductService) {
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

    this.isLoading = true;
    this._productService[!this.form.get('id')?.value ? 'addProduct' : 'updateProduct'](this.form.value)
      .pipe( // @ts-ignore
        finalize(() => this.isLoading = false),
        takeUntil(this.destroy$),
        tap((res) => this.modal.close(res)),
        catchError((err) => {
          this.modal.dismiss(err);
          return of(undefined);
          // @ts-ignore
        })).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.complete();
  }

}
