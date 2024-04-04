import { Component, OnInit } from '@angular/core';
import { Scheduling } from '../scheduling.model';
import { SchedulingService } from '../scheduling.service';
import { VolunteersService } from 'src/app/volunteers/volunteers.service';
import { Volunteer } from '../../volunteers/volunteer.model';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
  providers:[SchedulingService,VolunteersService]
})
export class SchedulingComponent implements OnInit {
  constructor(private schedulingService:SchedulingService,private volunteersService:VolunteersService) { 
  
    this.volunteersService.getVolunteers().subscribe(data=>{
      this.VolunteerLIST=data;
    })
    
  }
 
  ngOnInit(): void {
    this.schedulingService.getScheduling().subscribe((data)=>{
      this._scheduling=data;
      this.initializeFormControls();
    })
  }
  //daysForm:FormGroup=new FormGroup({});
  initializeFormControls() {
    this.daysForm = new FormGroup({
      "Sunday": new FormControl(this._scheduling?.favoriteVolunteers[0]),
      "Monday": new FormControl(this._scheduling?.favoriteVolunteers[1]),
      "Tuesday": new FormControl(this._scheduling?.favoriteVolunteers[2]),
      "Wensday": new FormControl(this._scheduling?.favoriteVolunteers[3]),
      "Thursday": new FormControl(this._scheduling?.favoriteVolunteers[4])
    });
  }
  _scheduling?:Scheduling;
  VolunteerLIST:Volunteer[]=[];
  daysOfWeek:string[]=[
    "Sunday","Monday","Tuesday","Wensday","Thursday"
  ];
  volunteersForDay(day:number){
    return this.VolunteerLIST.filter(v=>v.chosenDays[day]==true);
  }
  daysForm:FormGroup=new FormGroup({
    "Sunday":new FormControl(this._scheduling?.favoriteVolunteers[0]),
    "Monday":new FormControl(this._scheduling?.favoriteVolunteers[1]),
    "Tuesday":new FormControl(this._scheduling?.favoriteVolunteers[2]),
    "Wensday":new FormControl(this._scheduling?.favoriteVolunteers[3]),
    "Thursday":new FormControl(this._scheduling?.favoriteVolunteers[4])

  });

  saveScheduling(){
  
    if(this._scheduling){
      this._scheduling.favoriteVolunteers[0]=+(this.daysForm.controls['Sunday'].value);
      this._scheduling.favoriteVolunteers[1]=+(this.daysForm.controls['Monday'].value);
      this._scheduling.favoriteVolunteers[2]=+(this.daysForm.controls['Tuesday'].value);
      this._scheduling.favoriteVolunteers[3]=+(this.daysForm.controls['Wensday'].value);
      this._scheduling.favoriteVolunteers[4]=+(this.daysForm.controls['Thursday'].value);

    }
    this.updateFavoriteVolunteers(this._scheduling?.favoriteVolunteers);
  }
  updateFavoriteVolunteers(favoriteVolunteers:number[]|undefined){
    this.schedulingService.putSchedulingToServer(favoriteVolunteers).subscribe(data=>{
      console.log(data);
    });
    alert("Volunteer placement has been saved successfully📝");
}
}