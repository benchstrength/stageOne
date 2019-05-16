import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserDashComponent } from './user/components/user-dash/user-dash.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { UserDashImageComponent } from './user/components/user-dash-image/user-dash-image.component';
import { UserAssessmentComponent } from './user/components/user-assessment/user-assessment.component';
import { UserAssessmentExistingComponent } from './user/components/user-assessment-existing/user-assessment-existing.component';
import { UserAssessmentNewComponent } from './user/components/user-assessment-new/user-assessment-new.component';
import { GraphComponent } from './graph/graph.component';
import { LoginComponent } from './login/login.component';
import { UserDashGraphComponent } from './user/components/user-dash-graph/user-dash-graph.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatButtonModule, MatCheckboxModule, MatCardModule } from '@angular/material';

import { LoginFormComponent } from './login/login-form/login-form.component';
import { ChartsModule } from 'ng2-charts';
import { AuthService } from './auth/auth.service.spec';
import { RouterModule } from '@angular/router';
import { Routes } from '../app/app-routing/app-routes';
import { UserDashCardComponent } from './user/components/user-dash-card/user-dash-card.component';
import { AdminGraphComponent } from './admin/components/admin-graph/admin-graph.component';
import { SkillsGraphComponent } from './admin/components/skills-graph/skills-graph.component';
import { UsersGraphComponent } from './admin/components/users-graph/users-graph.component';
import { SearchbarComponent } from './admin/components/searchbar/searchbar.component';
import { FiltersComponent } from './admin/components/filters/filters.component';


@NgModule({
  declarations: [
    AppComponent,
    UserDashComponent,
    UserComponent,
    AdminComponent,
    UserDashImageComponent,
    UserAssessmentComponent,
    UserAssessmentExistingComponent,
    UserAssessmentNewComponent,
    GraphComponent,
    LoginComponent,
    UserDashGraphComponent,
    LoginFormComponent,
    UserDashCardComponent,
    AdminGraphComponent,
    SkillsGraphComponent,
    UsersGraphComponent,
    SearchbarComponent,
    FiltersComponent,
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
    RouterModule.forRoot(Routes),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PizzaPartyAppModule { }
