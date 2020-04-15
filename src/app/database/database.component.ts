import { Component, OnInit } from '@angular/core';
import {BaseDatabase} from "./base-database/baseDatabase";
import {Patient} from "./database-models/Patient";

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  Patients: BaseDatabase;

  constructor() {
    this.Patients = new BaseDatabase('patients', Patient)
  }

  ngOnInit(): void {
    console.log('Hello World! database component')

    this.Patients.create()
  }

}
