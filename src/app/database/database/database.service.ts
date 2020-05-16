import {Injectable} from '@angular/core';
import {Database} from "./database";
import {Patient} from "../database-models/Patient";
import {Subject} from "rxjs";
import {ErrorMessage, SuccesMessage} from "../database-models/Messages";
import {CareType} from "../database-models/CareType";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  patientCollection: Database<Patient>;

  log: Database<SuccesMessage | ErrorMessage>;
  private _logChanges: Subject<any> = new Subject<any>();
  get logChanges() {
    return this._logChanges.asObservable();
  }

  databases: Database<any>[] = [];

  constructor() {
    this.log = new Database('log');
    // this.log.db.changes({since: '0', include_docs: true}).then(changes => console.log(changes));

    this.patientCollection = new Database('patientCollection');

    // this.patientCollection.create(
    //   {
    //     first_name: 'Elon',
    //     last_name: 'Musk',
    //     age: 12,
    //     careList: [
    //       {
    //         type: CareType.OUTPATIENT,
    //         admission: new Date(Date.now() - 50000),
    //         discharge: null,
    //         discharge_reason: null,
    //         diagnosis: [{
    //           primary_diagnosis: 'cough',
    //           description: 'Probably Corona.'
    //         }]
    //       }
    //     ],
    //     home_village: 'San Fransisco',
    //     village_currently_living: 'Mars'
    //   }
    // );

    this.databases = [this.patientCollection];

    this.databases.forEach(database => {
      // Subscribe log database to log messages of other databases
      database.messages$.subscribe(message => {
        if (message.type === 'success') {
          this.log.create((message as SuccesMessage));
        } else if (message.type === 'error') {
          this.log.create((message as ErrorMessage));
        }
      });
    })
  }


}
