import { MergeColumn } from '../types/merge-column.type';

/**
 * Returns the columns by pin.
 */
export function columnsByPin(cols: any[]) {
  const ret: { left: any; center: any; right: any } = {
    left: [],
    center: [],
    right: []
  };

  if (cols) {
    for (const col of cols) {
      if (col.frozenLeft) {
        ret.left.push(col);
      } else if (col.frozenRight) {
        ret.right.push(col);
      } else {
        ret.center.push(col);
      }
    }
  }

  return ret;
}

/**
 * Returns the widths of all group sets of a column
 */
export function columnGroupWidths(groups: any, all: any) {
  return {
    left: columnTotalWidth(groups.left),
    center: columnTotalWidth(groups.center),
    right: columnTotalWidth(groups.right),
    total: Math.floor(columnTotalWidth(all))
  };
}

/**
 * Calculates the total width of all columns and their groups
 */
export function columnTotalWidth(columns: any[], prop?: string) {
  let totalWidth = 0;

  if (columns) {
    for (const c of columns) {
      const has = prop && c[prop];
      const width = has ? c[prop] : c.width;
      totalWidth = totalWidth + parseFloat(width);
    }
  }

  return totalWidth;
}

/**
 * Calculates the total width of all columns and their groups
 */
export function columnsTotalWidth(columns: any, prop?: any) {
  let totalWidth = 0;

  for (const column of columns) {
    const has = prop && column[prop];
    totalWidth = totalWidth + (has ? column[prop] : column.width);
  }

  return totalWidth;
}

export function columnsByPinArr(val: any) {
  const colsByPinArr = [];
  const colsByPin = columnsByPin(val);

  colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
  colsByPinArr.push({ type: 'center', columns: colsByPin['center'] });
  colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });

  return colsByPinArr;
}

export function columnByPinArrMerge(mergeHeader:any,val:any){
  const colsByPinArr = [];
  const colsByPin = columnsByPin(val);

  colsByPinArr.push({ type: 'left', columns: colsByPin['left'] });
  colsByPinArr.push({ type: 'center', columns: colsByMergeHeader(mergeHeader,colsByPin['center']) });
  colsByPinArr.push({ type: 'right', columns: colsByPin['right'] });

  return colsByPinArr;
}
export function colsByMergeHeader(mergeHeaders: MergeColumn[], cols: any[]) {
  const mergeHeaderTemplate = mergeHeaders;
  const colsByMerge:any[] = [];
  let i: number = 0;
  let groupId = 0;
  let title = "";
  let isPreviousMerged: boolean = false;
  while (i < cols.length) { 
      const merged = mergeHeaderTemplate.find(o => o.start - 1 <= i && i < o.start + o.colspan - 1);
      let check = merged ? true : false;

      if (isPreviousMerged != check || (merged && merged.title != title)) {
          groupId += 1;
      }
      
      if (merged) {
          isPreviousMerged = true;
          title = merged.title;
      }
      else {
          isPreviousMerged = false;
          title = '';
      }
  
      if (colsByMerge.some(o => o.groupId == groupId)) {
          colsByMerge.find(o => o.groupId == groupId).columns.push(cols[i]);
      }
      else {
          colsByMerge.push({ groupId : groupId, title: title, columns: [cols[i]] });
      }
     i++;
  }
  return colsByMerge;
}
