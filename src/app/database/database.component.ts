import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Database} from "./database/database";
import {DatabaseService} from "./database/database.service";

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements AfterViewInit {

  selectedDatabase: Database<any>;
  log;

  constructor(public databaseService: DatabaseService) {
  }

  ngAfterViewInit(): void {
    this.log = this.databaseService.log.documenten;
    console.log(this.log);
  }

  createPatient() {
    const patient = {
      _id: 'Patient_006',
      name: 'John Smith',
      ziekenhuisOpnameIds: []
    };

    this.databaseService.patienten.create(patient);
  }

}
