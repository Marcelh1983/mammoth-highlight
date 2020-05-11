import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { AppComponent } from './app.component';
import { MammothHighlightComponent } from './components/mammoth-highlight-component';

@NgModule({
  declarations: [
    AppComponent,
    MammothHighlightComponent
  ],
  imports: [
    NgxDocViewerModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
