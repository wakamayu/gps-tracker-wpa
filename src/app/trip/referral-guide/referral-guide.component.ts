import { Component, OnInit } from '@angular/core';
import { ReferralGuide } from 'src/app/interfaces/referral-guide';

@Component({
  selector: 'trip-referral-guide',
  templateUrl: './referral-guide.component.html',
  styleUrls: ['./referral-guide.component.css']
})
export class ReferralGuideComponent implements OnInit {

  referralGuideModel: ReferralGuide = {
    id: 0,
    numberGuide: "",
    addressee: "",
    idTrip: {
      id: 0, 
      idVehicle: {
        id: 0
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
