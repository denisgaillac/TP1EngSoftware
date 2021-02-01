import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PerformanceComponent } from './components/performance/performance.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './general-components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { LoadingComponent } from './general-components/loading/loading.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClassesComponent } from './components/classes/classes.component';



@NgModule({
  declarations: [
    AppComponent,
    ActivitiesComponent,
    PerformanceComponent,
    NavbarComponent,
    LoadingComponent,
    ClassesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    NgbModule,
    MatToolbarModule,
    MatListModule,
    FormsModule,
    NgxEchartsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    MatSnackBarModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
