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
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ViewDealerProfileComponent } from './view-dealer-profile/view-dealer-profile.component';
import { SalesmenProfilesComponent } from './salesmen-profiles/salesmen-profiles.component';

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
    DealerOrdersComponent,
    ViewDealerProfileComponent,
    SalesmenProfilesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
