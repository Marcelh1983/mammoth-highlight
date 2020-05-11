import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as Mark from 'mark.js';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
  <div>
    <input (input)="searchText = $event.target.value" placeholder="Search" />
    <app-mammoth-highlight 
        url="assets/file-sample_100kB.docx"
        [searchText]="searchText">
    </app-mammoth-highlight> 
  </div>
    
  `,
  styles: []
})
export class AppComponent {
  public searchText = '';
}
