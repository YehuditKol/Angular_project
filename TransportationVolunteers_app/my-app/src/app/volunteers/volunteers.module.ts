import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteerListComponent } from './volunteer-list/volunteer-list.component';
import { VolunteerDetailsComponent } from './volunteer-details/volunteer-details.component';
import { VolunteersService } from './volunteers.service';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const V_ROUTES:Route[]=[
  {path:"details",component:VolunteerDetailsComponent}
]

@NgModule({
  declarations: [ 
    VolunteerListComponent,
    VolunteerDetailsComponent
  ],
  providers:[VolunteersService],
  imports: [
    ReactiveFormsModule,CommonModule,HttpClientModule,RouterModule.forChild(V_ROUTES)
  ]
})
export class VolunteersModule { }
