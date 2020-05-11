import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import * as Mark from 'mark.js';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
  <div>
    <input (input)="search($event.target.value)" #input placeholder="Search" />
  </div>
<ngx-doc-viewer url="assets/file-sample_100kB.docx"
viewer="mammoth">
    
  `,
  styles: []
})
export class AppComponent implements OnDestroy {

  private markInstance: Mark;
  private debounceMarking = new Subject<string>();
  private debounceSubcription: Subscription;

  constructor() {
    this.debounceSubcription = this.debounceMarking.asObservable()
      .pipe(debounceTime(200))
      .subscribe(text => {
        if (!this.markInstance ) {
          this.markInstance = new Mark(document.querySelector('ngx-doc-viewer').firstChild as HTMLElement);
        }
        this.markInstance.unmark();
        this.markInstance.mark(text);
      });
  }

  ngOnDestroy(): void {
    if (this.debounceSubcription) {
      this.debounceSubcription.unsubscribe();
    }
  }

  search(value: string) {
    this.debounceMarking.next(value);
  }
}
