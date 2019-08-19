import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { InternalOrdersComponent } from './internal-orders/internal-orders.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { HomeBannersComponent } from './home-banners/home-banners.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ReportsComponent } from './reports/reports.component';
import { DealerOrdersComponent } from './dealer-orders/dealer-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    InternalOrdersComponent,
    ProfilesComponent,
    PromotionsComponent,
    HomeBannersComponent,
    FeedbackComponent,
    ReportsComponent,
    DealerOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
