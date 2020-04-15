import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseComponent } from './database.component';
import {SharedModule} from "../shared/shared.module";
import {DatabaseRoutingModule} from "./database-routing.module";
import {FlexModule} from "@angular/flex-layout";



@NgModule({
  declarations: [DatabaseComponent],
  imports: [
    CommonModule, SharedModule, DatabaseRoutingModule, FlexModule
  ]
})
export class DatabaseModule { }
