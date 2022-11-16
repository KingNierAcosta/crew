import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../Core/model/product.model';
import {ProductService} from '../../Core/services/product.service';
import {of, Subject} from 'rxjs';
import {catchError, finalize, takeUntil} from 'rxjs/operators';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddComponent} from '../add/add.component';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'price', 'serial_number', 'actions'];
  dataSource: Product[] = [];
  destroy$ = new Subject<boolean>();
  loading: boolean = false;

  constructor(private _productService: ProductService,
              private _ngbModal: NgbModal) {
  }

  ngOnInit(): void {
    this.loading = true;
    this._productService.getProducts()
      .pipe(
        catchError((err) => {
          return of(err);
        }),
        finalize(() => this.loading = false),
        takeUntil(this.destroy$))
      .subscribe(value => {
        this.loading = false;
        this.dataSource = value;
      });
  }

  addProduct(product?: Product) {
    const modalRef = this._ngbModal.open(AddComponent);
    if(product) modalRef.componentInstance.product = product;
  }

  deleteProduct(product: Product) {
    const modalRef = this._ngbModal.open(ConfirmModalComponent);
    modalRef.componentInstance.product = product;
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
    this.destroy$.complete();
  }

}
