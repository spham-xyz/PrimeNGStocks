import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from "@angular/router";

import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { FirestoreService } from './shared/firestore.service';

import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { ChartComponent } from './chart/chart.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "/portfolio", pathMatch: "full" },
  { path: "portfolio", component: PortfolioComponent },
  { path: "chart", component: ChartComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    DateFormatPipe,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    ButtonModule,
    ChartModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    MenuModule,
    PanelModule,
    TableModule
  ],
  providers: [FirestoreService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
