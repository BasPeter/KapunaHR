import {Injectable} from '@angular/core';
import {Database} from "./database";
import {Patient} from "../database-models/Patient";
import {ZiekenhuisOpname} from "../database-models/ZiekenhuisOpname";
import {merge, Observable, Subject} from "rxjs";
import {ErrorMessage, SuccesMessage} from "../database-models/Messages";
import {Diagnose} from "../database-models/Diagnose";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  patienten: Database<Patient>;
  ziekenhuisOpnames: Database<ZiekenhuisOpname>;
  diagnoses: Database<Diagnose>;

  log: Database<SuccesMessage | ErrorMessage>;
  private _logChanges: Subject<any> = new Subject<any>();
  get logChanges() {
    return this._logChanges.asObservable();
  }

  databases: Database<any>[] = [];

  constructor() {
    this.log = new Database('log');
    this.log.db.changes({since: '0', include_docs: true}).then(changes => console.log(changes));

    this.patienten = new Database('patienten');
    this.ziekenhuisOpnames = new Database('ziekenhuisOpnames');
    this.diagnoses = new Database('diagnoses')

    this.databases = [this.patienten, this.ziekenhuisOpnames, this.diagnoses];

    this.databases.forEach(database => {
      console.log('subscribe to: ', database.name);
      database.messages$.subscribe(message => {
        if (message.type === 'success') {
          console.log(message);
          this.log.db.post((message as SuccesMessage)).then(response => console.log(response));
        } else if (message.type === 'error') {
          this.log.db.post((message as ErrorMessage)).then(response => console.log(response));
        }
      });
    })
  }


}
