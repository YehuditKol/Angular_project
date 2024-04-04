import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Scheduling } from "./scheduling.model";
import { Observable } from "rxjs";

@Injectable()
export class SchedulingService{
    constructor(private _http:HttpClient){

    }
    getScheduling=():Observable<Scheduling>=>{
        return this._http.get<Scheduling>("/api/scheduling/Get");
    }
    putSchedulingToServer=(favoriteVolunteers:number[]|undefined):Observable<number[]>=>{
        return this._http.put<number[]>("/api/scheduling/Put",favoriteVolunteers)
    }
    
}
