import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { UserService } from "@chess-services";
import { Observable, catchError, map, of } from "rxjs";

@Injectable()
export class UniqueUsernameValidator implements AsyncValidator {

   constructor(
      private userService: UserService
   ) { }

   public validate(control: AbstractControl): Observable<ValidationErrors | null> {
      if(control.value.trim() === "") {
         return of(null);
      }
      return this.userService.getAllUsernames().pipe(
         map(names => names.includes(control.value.trim()) ? ({ invalidUsername: control.value }): null),
         catchError(_ => of({ missingData: true }))
      );
   }
}