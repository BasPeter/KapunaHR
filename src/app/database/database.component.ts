import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Database} from "./database/database";
import {DatabaseService} from "./database/database.service";
import {Observable} from "rxjs";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {JsonEditorComponent, JsonEditorOptions} from "ang-jsoneditor";
import {EditDocumentDialogComponent} from "./edit-document-dialog/edit-document-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss']
})
export class DatabaseComponent {

  selectedCollection: Database<any>;
  log: Observable<any>;

  constructor(public databaseService: DatabaseService,
              public dialog: MatDialog,
              iconRegistry: MatIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'database',
      sanitizer.bypassSecurityTrustResourceUrl('./../../assets/icons/database.svg'));
    iconRegistry.addSvgIcon(
      'collection',
      sanitizer.bypassSecurityTrustResourceUrl('./../../assets/icons/text-box-multiple-outline.svg'));
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


  openDialog(json: string): void {
    const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
      width: '600px',
      height: '600px',
      data: {json}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  saveJson(event: any) {
    console.log(event);
  }

  // ngAfterViewInit(): void {
  //   this.log = this.databaseService.log.documenten$;
  // }

}
