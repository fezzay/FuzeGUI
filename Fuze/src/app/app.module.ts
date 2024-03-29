import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NodeDashboardGraphComponent } from './Dashboard/node.dashboard.graph/node.dashboard.graph.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeDashboardGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
