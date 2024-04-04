import { FormControl } from '@angular/forms';
export class Volunteer{
    id:number=0;
    firstName?:string;
    lastName?:string;
    fone?:string;
    numOfPlaces?:number;
    chosenDays: boolean[] = [];

    constructor(){
       
    }
}