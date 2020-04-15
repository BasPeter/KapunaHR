import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, HeaderComponent],
  imports: [CommonModule, FormsModule, FlexModule],
  exports: [WebviewDirective, FormsModule, HeaderComponent]
})
export class SharedModule {}
