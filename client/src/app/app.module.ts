import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { UserAssessmentComponent } from './user/components/user-assessment/user-assessment.component';
import { GraphComponent } from './graph/graph.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatCardModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { AuthService } from './auth/auth.service.spec';
import { RouterModule } from '@angular/router';
import { Routes } from '../app/app-routing/app-routes';
import { UserDashCardComponent } from './user/components/user-dash-card/user-dash-card.component';
import { UserAddskillComponent } from './user-addskill/user-addskill.component';

import { AdminGraphComponent } from './admin/components/admin-graph/admin-graph.component';
import { SkillsGraphComponent } from './admin/components/skills-graph/skills-graph.component';
import { UsersGraphComponent } from './admin/components/users-graph/users-graph.component';
import { SearchbarComponent } from './admin/components/searchbar/searchbar.component';
import { FiltersComponent } from './admin/components/filters/filters.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AdminComponent,
    UserAssessmentComponent,
    GraphComponent,
    LoginComponent,
    UserDashCardComponent,
    UserAddskillComponent,
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
    MatButtonModule, 
    MatCheckboxModule,
    ChartsModule,
    HttpClientModule,
    MatCardModule,
    RouterModule.forRoot(Routes),
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PizzaPartyAppModule { }
