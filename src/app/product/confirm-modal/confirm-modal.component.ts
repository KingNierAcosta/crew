import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../../Core/services/product.service';
import {Product} from '../../Core/model/product.model';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit, OnDestroy {

  // @ts-ignore
  @Input() product: Product;
  destroy$ = new Subject<boolean>();

  constructor(private _modal: NgbActiveModal,
              private _productService: ProductService) {
  }

  ngOnInit(): void {
  }

  close() {
    this._modal.dismiss();
  }

  delete() {
    if (!this.product) return;

    this._productService.deleteProduct(this.product)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.close());
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.complete();
  }

}
