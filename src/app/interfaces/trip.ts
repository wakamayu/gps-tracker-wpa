
import { FormControl } from "@angular/forms";
import { Routes } from "./routes";

import { Vehicle } from "./vehicle";

export interface Trip {

    id: Number;

    point?: String;

    arrivalPoint?: String;

    travelDate?: Date;
    
    idVehicle: Vehicle;

    routeCollection?: Routes[];

}
