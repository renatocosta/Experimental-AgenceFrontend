import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatDividerModule, MatIconModule, MatListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSelectModule, MatGridListModule, MatProgressSpinnerModule } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { TabComponent } from './tab/tab.component';
import {MatTabsModule} from '@angular/material/tabs';
import { TableComponent } from './table/table.component';
import { FilterComponent } from './filter/filter.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { globals } from '../environments/globals';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { HttpClientModule } from  '@angular/common/http';

//create our cost var with the information about the format that we want
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    TabComponent,
    TableComponent,
    FilterComponent,
    PieChartComponent,
    BarChartComponent,
    ProgressSpinnerComponent
  ],
  imports: [
    FormsModule,  
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    ChartsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ReactiveFormsModule    
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'it' }, //you can change useValue
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
