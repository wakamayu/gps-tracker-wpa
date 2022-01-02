import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Trip } from '../interfaces/trip';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripService {



  constructor(private http: HttpClient) { }

  allTrip() {
    return this.http.get<Trip[]>(environment.api + "/trip/all").pipe(
      catchError(this.handleError)
    )
  }

  create(trip: Trip) {
    return this.http.post<Trip>(environment.api + "/trip", trip).pipe(
      catchError(this.handleError)
    )
  }
  findById(trip: Trip) {
    return this.http.get<Trip>(environment.api + "/trip/id/" + trip.id).pipe(
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
