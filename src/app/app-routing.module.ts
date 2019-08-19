import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InternalOrdersComponent} from '../app/internal-orders/internal-orders.component';
import {DealerOrdersComponent} from '../app/dealer-orders/dealer-orders.component';
import {DashboardComponent} from '../app/dashboard/dashboard.component';
import {FeedbackComponent} from '../app/feedback/feedback.component';
import {ProfilesComponent} from '../app/profiles/profiles.component';
import {PromotionsComponent} from '../app/promotions/promotions.component';
import {ReportsComponent} from '../app/reports/reports.component';
import { HomeBannersComponent } from './home-banners/home-banners.component';



const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'internalOrders/:id', component: InternalOrdersComponent},
  {path: 'dealerOrders/:id', component: DealerOrdersComponent},
  {path: 'profiles/:id', component: ProfilesComponent},
  {path: 'promotions', component: PromotionsComponent},
  {path: 'homeBanners', component: HomeBannersComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'feedback', component: FeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
