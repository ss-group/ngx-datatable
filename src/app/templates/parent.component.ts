import { Component, ViewChild, ContentChildren, QueryList, Input, ChangeDetectorRef } from '@angular/core';
import { DatatableComponent, DatatableMergeHeaderDirective, DataTableColumnDirective, ColumnMode } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
   selector: 'app-table',
   templateUrl:'./parent.component.html'
})
export class ParentComponent {
    ColumnMode = ColumnMode;
    @Input() rows = [];
    @ViewChild(DatatableComponent,{static : true}) datatable: DatatableComponent;
    @ContentChildren(DatatableMergeHeaderDirective) merges : QueryList<DatatableMergeHeaderDirective>;
    @ContentChildren(DataTableColumnDirective) columns: QueryList<DataTableColumnDirective>;

    ngAfterContentInit() {
      this.datatable.mergeHeaders = this.merges;
      this.datatable.columnTemplates = this.columns;
    }
  
}