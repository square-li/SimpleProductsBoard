import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../components/dialog/dialog.component';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(public dialog: MatDialog) {
  }

  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      minHeight: 600,
      data: product
    });
  }
}
