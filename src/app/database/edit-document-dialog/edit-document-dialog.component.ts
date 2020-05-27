import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {JsonEditorComponent, JsonEditorOptions} from "ang-jsoneditor";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-document-dialog',
  templateUrl: './edit-document-dialog.component.html',
  styleUrls: ['./edit-document-dialog.component.scss']
})
export class EditDocumentDialogComponent implements OnInit {

  public editorOptions: JsonEditorOptions;

  json: any;
  editedJson = this.json;
  @ViewChild(JsonEditorComponent, {static: false}) editor: JsonEditorComponent;

  documentCredetials: { _id: string, _rev: string } = {_id: '', _rev: ''};

  constructor(
    public dialogRef: MatDialogRef<EditDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.json = this.data.mode === 'edit' ? this.stripCredentials(this.data.json) : '';
    this.editedJson = this.json;

    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stripCredentials(json: any): string {
    this.documentCredetials._id = json._id;
    this.documentCredetials._rev = json._rev;

    delete json._id;
    delete json._rev;

    return json;
  }

  isSaveable(): boolean {
    return this.editedJson !== this.json
  }

  changes(event = null) {
    this.editedJson = this.editor.get();
  }

  addCredentials(json: any): string {
    if (this.data.mode === 'edit') {
      json._id = this.documentCredetials._id;
      json._rev = this.documentCredetials._rev;
    }
      return json;
  }
}
