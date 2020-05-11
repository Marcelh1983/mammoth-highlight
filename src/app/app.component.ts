import { Component } from '@angular/core';
import * as Mark from 'mark.js';

@Component({
  selector: 'app-root',
  template: `
  <div>
    <input #input placeholder="Search" />
    <button (click)="search(input)">Search</button>
  </div>
<ngx-doc-viewer url="assets/file-sample_100kB.docx"
viewer="mammoth">
    
  `,
  styles: []
})
export class AppComponent {
  title = 'mammoth-highlight';

  search(input: HTMLInputElement) {
    console.log(`Searched for: ${input.value}`);
    const instance = new Mark(document.querySelector('ngx-doc-viewer').firstChild as HTMLElement);
    instance.mark(input.value);
  }
}
