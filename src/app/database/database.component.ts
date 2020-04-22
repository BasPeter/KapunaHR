import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Database} from "./database/database";
import {DatabaseService} from "./database/database.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements AfterViewInit {

  selectedDatabase: Database<any> | 'log' = this.databaseService.databases[0];
  log: Observable<any>

  constructor(public databaseService: DatabaseService) {
  }

  ngAfterViewInit(): void {
    this.log = this.databaseService.log.documenten$;
  }

  getObjectEntries(obj: Object) {
    return Object.entries(obj);
  }

  createPatient() {
    const patient = {
      name: 'John Smith',
      ziekenhuisOpnameIds: []
    };

    this.databaseService.patienten.create(patient);
  }

}
