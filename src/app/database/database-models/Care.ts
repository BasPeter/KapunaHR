import {Diagnosis} from "./Diagnosis";
import {CareType} from "./CareType";

export interface Care {
type: CareType;
admission: Date;
discharge: Date;
discharge_reason: string;
diagnosis: Diagnosis[];
}
