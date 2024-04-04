import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Volunteer } from './volunteer.model';

@Injectable()
export class VolunteersService{
    constructor(private _http:HttpClient){

    }
    getVolunteers=():Observable<Volunteer[]>=>{
        return this._http.get<Volunteer[]>("/api/volunteers/Get");
    }
    getVolunteerFromServerById = (id: Number): Observable<Volunteer> => {
        return this._http.get<Volunteer>("/api/Volunteers/GetById/?id=" + id);
    }
    putVolunteerToServer=(id:number|undefined,volunteer:Volunteer|undefined):Observable<Volunteer[]> => {
        return this._http.put<Volunteer[]>("/api/Volunteers/Put/"+id,volunteer);
       
    }
   
}