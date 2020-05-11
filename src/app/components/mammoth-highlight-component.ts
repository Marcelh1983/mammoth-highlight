import { Component, AfterViewInit, OnDestroy, Input } from '@angular/core';
import * as Mark from 'mark.js';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-mammoth-highlight',
    template: `<ngx-doc-viewer [url]="url" viewer="mammoth">`,
    styles: []
})
export class MammothHighlightComponent implements OnDestroy {
    @Input() url: string;
    @Input() debounceTime = 500;
    @Input('searchText')
    set searchText(value: string) {
        this.debounceMarking.next(value);
    }
    private markInstance: Mark;
    private debounceMarking = new Subject<string>();
    private debounceSubcription: Subscription;

    constructor() {
        this.debounceSubcription = this.debounceMarking.asObservable()
            .pipe(debounceTime(200))
            .subscribe(text => {
                if (!this.markInstance) {
                    const documentContent = document.querySelector('ngx-doc-viewer')?.firstChild as HTMLElement;
                    if (documentContent) {
                        this.markInstance = new Mark(document.querySelector('ngx-doc-viewer').firstChild as HTMLElement);
                    }
                }
                this.markInstance?.unmark();
                this.markInstance?.mark(text);
            });
    }

    ngOnDestroy(): void {
        if (this.debounceSubcription) {
            this.debounceSubcription.unsubscribe();
        }
    }
}
