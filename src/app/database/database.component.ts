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

  log: Observable<any>;


  constructor(public databaseService: DatabaseService) {
  }

  ngAfterViewInit(): void {
    this.log = this.databaseService.log.documenten$;


    // this.databaseService.patientCollection.documenten$.subscribe(collection => console.log(collection));
  }

}
