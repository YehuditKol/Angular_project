import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SchedulingComponent
  ],
  imports: [
    CommonModule,HttpClientModule,ReactiveFormsModule
  ]
})
export class SchedulingModule { }
