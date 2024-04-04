import { Component } from '@angular/core';
import { Volunteer } from '../volunteer.model';
import { VolunteersService } from '../volunteers.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html',
  styleUrls: ['./volunteer-list.component.scss'],
  providers:[VolunteersService]
  
})
export class VolunteerListComponent {

  volunteerLIST:Volunteer[]=[];
  constructor(private volunteersService:VolunteersService,private _router:Router,private _acr:ActivatedRoute){
    //trt in oninit
    this.volunteersService.getVolunteers().subscribe(data=>{
      this.volunteerLIST=data;
    })
    
   
    
  }
  
  updateVolunteer=(id:number,v:Volunteer)=>{
    this.volunteersService.putVolunteerToServer(id,v).subscribe;
  }
  navigateToDetails(volunteer:Volunteer){
    this._router.navigate(['/details',{volunteer:JSON.stringify(volunteer)}]);
    //this._router.navigate(['/details',{id:volunteer.id}]);

  }

}
