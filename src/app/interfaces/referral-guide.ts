import { Trip } from "./trip";

export interface ReferralGuide {
    id: Number;
    numberGuide?: String;
    addressee?: String;
    idTrip: Trip;
}
