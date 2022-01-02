import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { ReferralGuide } from '../interfaces/referral-guide';
@Injectable({
  providedIn: 'root'
})
export class ReferralGuideService {
  constructor(private http: HttpClient) { }

  allReferralGuide() {
    return this.http.get<ReferralGuide[]>(environment.api + "/referral-guide/all").pipe(
      catchError(this.handleError)
    )
  }


  findReferenceGuideByidTrip(params: {}) {
    return this.http.get<ReferralGuide[]>(environment.api + "/referral-guide/all", { params: params }).pipe(
      catchError(this.handleError)
    )
  }
  findReferenceGuide(referralGuide: ReferralGuide) {
    return this.http.get<ReferralGuide>(environment.api + "/referral-guide/id-number-guide/" + referralGuide.numberGuide, {}).pipe(
      catchError(this.handleError)
    )
  }

  create(referralGuide: ReferralGuide) {
    return this.http.post<ReferralGuide>(environment.api + "/referral-guide", referralGuide).pipe(
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
