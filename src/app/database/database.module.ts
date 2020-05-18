import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseComponent } from './database.component';
import {SharedModule} from "../shared/shared.module";
import {DatabaseRoutingModule} from "./database-routing.module";
import {FlexModule} from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgJsonEditorModule} from "ang-jsoneditor";
import { EditDocumentDialogComponent } from './edit-document-dialog/edit-document-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [DatabaseComponent, EditDocumentDialogComponent],
  imports: [
    CommonModule, SharedModule, DatabaseRoutingModule, FlexModule, MatToolbarModule, MatExpansionModule, MatInputModule,
    BrowserAnimationsModule, MatMenuModule, MatIconModule, MatButtonModule, NgJsonEditorModule, MatDialogModule
  ]
})
export class DatabaseModule { }
