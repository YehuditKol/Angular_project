import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Volunteer } from '../volunteer.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { VolunteersService } from '../volunteers.service';
import { SchedulingService } from 'src/app/scheduling/scheduling.service';
import { Scheduling } from 'src/app/scheduling/scheduling.model';

@Component({
  selector: 'app-volunteer-details',
  templateUrl: './volunteer-details.component.html',
  styleUrls: ['./volunteer-details.component.scss'],
  providers:[VolunteersService,SchedulingService]
})
export class VolunteerDetailsComponent implements OnInit {
  private _volunteer?:Volunteer;
  _scheduling?:Scheduling;
  _id?:number;
  daysOfWeek:string[]=[
    "Sunday","Monday","Tuesday","Wensday","Thursday"
  ];
  volunteerForm:FormGroup=new FormGroup({});

  constructor(private schedulingService:SchedulingService,private volunteersService:VolunteersService,private _acr:ActivatedRoute,private _router:Router){
    
     this._volunteer=JSON.parse(this._acr.snapshot.paramMap.get('volunteer') ?? '');
     //this._id=+(this._acr.snapshot.paramMap.get('id') ?? '');
     //this.volunteersService.getVolunteerFromServerById(this._id).subscribe(data=>{
    //   this._volunteer=data;
    //  })
     this.volunteerForm=new FormGroup({
      "id":new FormControl(this.volunteer?.id),
      "firstName":new FormControl(this.volunteer?.firstName),
      "lastName":new FormControl(this.volunteer?.lastName),
      "numOfPlaces":new FormControl(this.volunteer?.numOfPlaces),
      "phone":new FormControl(this.volunteer?.fone),
      "chosenDays0":new FormControl(this.volunteer?.chosenDays[0]),
      "chosenDays1":new FormControl(this.volunteer?.chosenDays[1]),
      "chosenDays2":new FormControl(this.volunteer?.chosenDays[2]),
      "chosenDays3":new FormControl(this.volunteer?.chosenDays[3]),
      "chosenDays4":new FormControl(this.volunteer?.chosenDays[4])
  
    });
    this.schedulingService.getScheduling().subscribe(data=>{
      this._scheduling=data;
    })
  }
  ngOnInit() {
   
  }
 
  get volunteer():Volunteer|undefined{
    
    return this._volunteer;
  };

  set volunteer(value: Volunteer | undefined) {
    if(value)
      this._volunteer = value;
  }

  @Output()
  onSaveVolunteer: EventEmitter<Volunteer> = new EventEmitter();

  saveVolunteer=()=>{
    try{
      if(this.volunteerForm.valid){
        const formValue = this.volunteerForm.value;
        if(this._scheduling?.favoriteVolunteers!=undefined){
        
          for (let index = 0; index < this._scheduling?.favoriteVolunteers.length; index++) {
            if(this.volunteer?.id==this._scheduling.favoriteVolunteers[index]&&this.volunteerForm.controls[`chosenDays${index}`].value==false){
              throw new Error("the update is unavailable");
              
            }
          
          }
        }
        console.log(formValue)
      if(this.volunteer!=undefined){
        if(this.volunteer){
        this.volunteer.chosenDays[0]=this.volunteerForm.controls['chosenDays0'].value;
        this.volunteer.chosenDays[1]=this.volunteerForm.controls['chosenDays1'].value;
        this.volunteer.chosenDays[2]=this.volunteerForm.controls['chosenDays2'].value;
        this.volunteer.chosenDays[3]=this.volunteerForm.controls['chosenDays3'].value;
        this.volunteer.chosenDays[4]=this.volunteerForm.controls['chosenDays4'].value;
        const data = {...this.volunteer, ...formValue};
        this.volunteer = data;
        console.log(this.volunteer);
        console.log(data);
        }
      }
     
      this.updateVolunteer(this.volunteer?.id,this.volunteer);
      this._router.navigate(["/volunteer"]);
    }
    }catch(err){
      alert(err+`:\nThe volunteer ${this.volunteer?.firstName+" "+this.volunteer?.lastName} has already been placed in the scheduling`);
    }finally{
      

        
    }

  }
  
  updateVolunteer(id:number|undefined,v:Volunteer|undefined){
    this.volunteersService.putVolunteerToServer(id,v).subscribe(data=>{
      console.log(data);
    });
  }



  

}
