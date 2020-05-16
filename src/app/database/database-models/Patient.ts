import {Care} from "./Care";

export interface Patient {
  first_name: string;
  last_name: string;
  age: number;
  careList: Care[];
  home_village: string;
  village_currently_living: string;
}
