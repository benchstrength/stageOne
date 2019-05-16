import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { UserDashImageComponent } from './user/components/user-dash-image/user-dash-image.component';
import { UserAssessmentComponent } from './user/components/user-assessment/user-assessment.component';
import { GraphComponent } from './graph/graph.component';
import { LoginComponent } from './login/login.component';
import { UserDashGraphComponent } from './user/components/user-dash-graph/user-dash-graph.component';
import { AdminDashFocusedGraphComponent } from './admin/components/admin-dash-focused-graph/admin-dash-focused-graph.component';
import { AdminDashPrimaryGraphComponent } from './admin/components/admin-dash-primary-graph/admin-dash-primary-graph.component';
import { AdminDashSecondaryGraphComponent } from './admin/components/admin-dash-secondary-graph/admin-dash-secondary-graph.component';
import { AdminDashToggleComponent } from './admin/components/admin-dash-toggle/admin-dash-toggle.component';
import { AdminDashSwapComponent } from './admin/components/admin-dash-swap/admin-dash-swap.component';
import { AdminDashBackBtnComponent } from './admin/components/admin-dash-back-btn/admin-dash-back-btn.component';
import { AdminDashFilterComponent } from './admin/components/admin-dash-filter/admin-dash-filter.component';
import { AdminDashSearchComponent } from './admin/components/admin-dash-search/admin-dash-search.component';
import { AdminDashSearchResultsComponent } from './admin/components/admin-dash-search-results/admin-dash-search-results.component';
import { AdminDashGraphContentComponent } from './admin/components/admin-dash-graph-content/admin-dash-graph-content.component';
import { AdminDashGraphTitleComponent } from './admin/components/admin-dash-graph-title/admin-dash-graph-title.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatButtonModule, MatCheckboxModule, MatCardModule, MatGridList, MatGridTile } from '@angular/material';

import { LoginFormComponent } from './login/login-form/login-form.component';
import { ChartsModule } from 'ng2-charts';
import { AuthService } from './auth/auth.service.spec';
import { RouterModule } from '@angular/router';
import { Routes } from '../app/app-routing/app-routes';
import { UserDashCardComponent } from './user/components/user-dash-card/user-dash-card.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FlexLayoutModule } from '@angular/flex-layout'

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdminComponent,
    UserDashImageComponent,
    UserAssessmentComponent,
    GraphComponent,
    LoginComponent,
    UserDashGraphComponent,
    AdminDashFocusedGraphComponent,
    AdminDashPrimaryGraphComponent,
    AdminDashSecondaryGraphComponent,
    AdminDashToggleComponent,
    AdminDashSwapComponent,
    AdminDashBackBtnComponent,
    AdminDashFilterComponent,
    AdminDashSearchComponent,
    AdminDashSearchResultsComponent,
    AdminDashGraphContentComponent,
    AdminDashGraphTitleComponent,
    LoginFormComponent,
    UserDashCardComponent,
    UserPageComponent,
    AdminPageComponent,
    LoginPageComponent,
    MatGridList,
    MatGridTile,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    ChartsModule,
    HttpClientModule,
    MatCardModule,
    FlexLayoutModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PizzaPartyAppModule { }
