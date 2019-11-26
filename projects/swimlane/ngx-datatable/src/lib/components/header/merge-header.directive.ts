import { Input, Output, EventEmitter, Directive, TemplateRef, ContentChild, ElementRef } from '@angular/core';

@Directive({ selector: 'ngx-datatable-merge-header' })
export class DatatableMergeHeaderDirective {
    @Input() start:number = 0;
    @Input() colspan:number = 1;
    @Input() title:string;
    @Input() class:string;
}