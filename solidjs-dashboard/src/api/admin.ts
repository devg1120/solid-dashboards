import {
  ApiListResponse,
  TableQuery,
} from "../components/datatable/table-types";
import { AdminUser } from "../pages/admin-list";

export async function fetchAdmins(
  query: TableQuery,
): Promise<ApiListResponse<AdminUser>> {
  const isSearchEmpty = !query.search || query.search.trim() === "";
  const isSortByEmpty =
    !query.sortBy || query.sortBy.trim() === "" || !query.sortBy?.length;
  const params = new URLSearchParams({
    pageNum: String(query.pageNum),
    pageLimit: String(query.pageLimit),
    ...(isSearchEmpty ? {} : { search: query.search }),
    ...(isSortByEmpty ? {} : { sortBy: query.sortBy }),
    sortOrder: query.sortOrder || "DESC",
  });

  const res = await fetch(
    `http://localhost:3001/api/v1/admin/user-management?${params}`,
  );

  const json = await res.json();

  return json.data;
}
