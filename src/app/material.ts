import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {DataSource} from '@angular/cdk/table';
import { CdkTableModule } from '@angular/cdk/table';
import {MatInputModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material';
import { MatSortModule} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    CdkTableModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatSortModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatTableModule,
    CdkTableModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatSortModule
  
  ],
})
export class MaterialModule { }