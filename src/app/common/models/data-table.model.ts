export type ColumnSort = {
  columnId: string;
  direction: 'asc' | 'desc' | '';
};

export type Pagination = {
  pageIndex: number;
  pageSize: number;
  totalItems: number;
};
