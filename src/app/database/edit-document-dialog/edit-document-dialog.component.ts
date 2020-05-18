import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {JsonEditorComponent, JsonEditorOptions} from "ang-jsoneditor";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-document-dialog',
  templateUrl: './edit-document-dialog.component.html',
  styleUrls: ['./edit-document-dialog.component.css']
})
export class EditDocumentDialogComponent {

  public editorOptions: JsonEditorOptions;
  json: string;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

  constructor(
    public dialogRef: MatDialogRef<EditDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.json = data.json;
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
