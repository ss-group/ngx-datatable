import { Component } from '@angular/core';
import { MockServerResultsService } from './mock-server-results-service';
import { PagedData } from './model/paged-data';
import { CorporateEmployee } from './model/corporate-employee';
import { Page } from './model/page';
import { ColumnMode, SelectionType } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'server-paging-demo',
  providers: [MockServerResultsService],
  template: `
    <div>
      <h3>
        Server-side Paging
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/paging/paging-server.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        rowHeight="auto"
        [externalPaging]="true"
        [count]="page.totalElements"
        [offset]="page.pageNumber"
        [limit]="page.size"
        [rowIdentity]="identity"
        [selected]="selected"
        [selectionType]="SelectionType.checkbox"
        (select)="onSelect($event)"
        (page)="setPage($event)"
      >
      <ngx-datatable-column
      [width]="30"
      [sortable]="false"
      [canAutoResize]="false"
      [draggable]="false"
      [resizeable]="false"
    >
    <ng-template
    ngx-datatable-header-template
    let-value="value"
    let-allRowsSelected="allRowsSelected"
    let-selectFn="selectFn"
  >
    <input type="checkbox" [checked]="allRowsSelected" (change)="selectFn(!allRowsSelected)" />
  </ng-template>
      <ng-template
        ngx-datatable-cell-template
        let-value="value"
        let-isSelected="isSelected"
        let-onCheckboxChangeFn="onCheckboxChangeFn"
      >
        <input type="checkbox" [checked]="isSelected" (change)="onCheckboxChangeFn($event)" />
      </ng-template>
    </ngx-datatable-column>
    <ngx-datatable-column name="Name"></ngx-datatable-column>
    <ngx-datatable-column name="Gender"></ngx-datatable-column>
    <ngx-datatable-column name="Company"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class ServerPagingComponent {
  page = new Page();
  rows = new Array<CorporateEmployee>();
  selected = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  constructor(private serverResultsService: MockServerResultsService) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  ngOnInit() {
    this.setPage({ offset: 0 });
  }
  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.serverResultsService.getResults(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }
  identity(row){
    return row.name
  }
}
