import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { Vehicle } from '../interfaces/vehicle';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  allVehicle() {
    return this.http.get<Vehicle[]>(environment.api + "/vehicle/all").pipe(
      catchError(this.handleError)
    )
  }

  create(vehicle: Vehicle) {
    return this.http.post<Vehicle>(environment.api + "/vehicle", vehicle).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
