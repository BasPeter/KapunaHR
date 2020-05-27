import {Component, OnInit} from '@angular/core';
import {Database} from "./database/database";
import {DatabaseService} from "./database/database.service";
import {Observable} from "rxjs";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {EditDocumentDialogComponent} from "./edit-document-dialog/edit-document-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ElectronService} from "../core/services";

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent implements OnInit {

  selectedCollection: Database<any>;
  log: Observable<any>;

  constructor(public databaseService: DatabaseService,
              public dialog: MatDialog,
              private electronService: ElectronService,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'database',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/database.svg'));
    iconRegistry.addSvgIcon(
      'collection',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/icons/text-box-multiple-outline.svg'));
  }

  ngOnInit(): void {
    this.selectCollection('patient');
    this.electronService.ipcRenderer.on('create-backup', (event, message) => {
      this.createBackup();
    });
    this.electronService.ipcRenderer.on('import-backup', (event, message) => {
      this.importBackup();
    });
  }


  selectCollection(collection: string) {
    switch (collection) {
      case 'patient' :
        this.selectedCollection = this.databaseService.patientCollection;
        break;
      default :
        this.selectedCollection = this.databaseService.log;
    }
  }


  openDialog(json: string, mode: 'add' | 'edit'): void {
    const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
      width: '600px',
      height: '600px',
      data: {json, mode}
    });

    dialogRef.afterClosed().subscribe(document => {
      if (document && mode === 'edit') {
        this.selectedCollection.update(document);
      } else if (document && mode === 'add') {
        console.log('create document: ', document);
        this.selectedCollection.create(document);
      }
    });
  }

  createBackup() {
    const writeStream = this.electronService.fs.createWriteStream(`${this.selectedCollection.name}-backup2.txt`);
    // ignore typescript type checking on Database object
    (<any>this.selectedCollection.db).dump(writeStream).then(function (res) {
      console.log('create backup: ', res);
    });
  }

  importBackup() {
    console.log('importing backup...');
    let readStream = this.electronService.fs.createReadStream(`${this.selectedCollection.name}-backup.txt`);
    console.log(readStream);
    // ignore typescript type checking on Database object
    (<any>this.selectedCollection.db).load(readStream).then(function (res) {
      console.log('import backup: ', res);
    });
  }
}
