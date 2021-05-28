import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
 import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
 import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
// import { MatRippleModule } from '@angular/material/ripple';


// set required material modules for the applcation
const reqModules = [
  MatToolbarModule,
  MatTabsModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatTableModule,
  MatSortModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatTabsModule,
  MatProgressBarModule,
  MatRippleModule,
  // DragDropModule,
  // ScrollingModule
];

@NgModule({
  imports: reqModules,
  exports: reqModules
})
export class MaterialModule { }
