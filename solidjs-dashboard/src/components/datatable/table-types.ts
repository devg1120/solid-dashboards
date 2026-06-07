// types/datatable.ts

export type SortOrder = "ASC" | "DESC";

export interface TableQuery {
  pageNum: number;
  pageLimit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  filters?: Record<string, string | number | boolean>;
}

export interface ApiMeta {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: ApiMeta;
}

export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  filter?: boolean;
  render?: (row: T) => any;
}
