import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { VolunteerListComponent } from './volunteers/volunteer-list/volunteer-list.component';
import { SchedulingComponent } from './scheduling/scheduling/scheduling.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { VolunteersModule } from './volunteers/volunteers.module';
import { SchedulingModule } from './scheduling/scheduling.module';
const APP_ROUTES:Route[]=[
  {path:"scheduling",component:SchedulingComponent},
  {path:"volunteer",component:VolunteerListComponent}

];
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,RouterModule.forRoot(APP_ROUTES),HttpClientModule,VolunteersModule,SchedulingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
