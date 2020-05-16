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



@NgModule({
  declarations: [DatabaseComponent],
  imports: [
    CommonModule, SharedModule, DatabaseRoutingModule, FlexModule, MatToolbarModule, MatExpansionModule, MatInputModule,
    BrowserAnimationsModule
  ]
})
export class DatabaseModule { }
