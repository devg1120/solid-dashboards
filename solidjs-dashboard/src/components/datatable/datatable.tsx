import { createStore } from "solid-js/store";
import {
  batch,
  createEffect,
  createMemo,
  createResource,
  createSignal,
  For,
  onCleanup,
  Show,
} from "solid-js";
import { ColumnDef, TableQuery, ApiListResponse } from "./table-types";

type Props<T> = {
  columns: ColumnDef<T>[];
  fetcher: (query: TableQuery) => Promise<ApiListResponse<T>>;
};
const tableLoader = <div class="w-full text-center my-5">Loading...</div>;

export default function DataTable<T>(props: Props<T>) {
  let timer: number;
  const [query, setQuery] = createStore<TableQuery>({
    pageNum: 0,
    pageLimit: 10,
    search: "",
    sortBy: "",
    sortOrder: "DESC",
    filters: {},
  });
  const queryKey = createMemo(() => {
    return JSON.stringify({
      pageNum: query.pageNum,
      pageLimit: query.pageLimit,
      search: query.search,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    });
  });
  const [searchInput, setSearchInput] = createSignal("");

  createEffect(() => {
    const value = searchInput();

    clearTimeout(timer);

    timer = setTimeout(() => {
      batch(() => {
        setQuery("search", value);
        setQuery("pageNum", 0);
      });
    }, 400);
    return () => clearTimeout(timer);
  });

  onCleanup(() => clearTimeout(timer));
  const [data] = createResource(queryKey, (key) => {
    const q = JSON.parse(key);
    return props.fetcher(q);
  });

  const toggleSort = (col: ColumnDef<T>) => {
    if (!col.sortable) return;

    batch(() => {
      setQuery("sortBy", col.key as string);
      setQuery("sortOrder", query.sortOrder === "ASC" ? "DESC" : "ASC");
    });
  };

  return (
    <div class="p-8">
      <div class="flex flex-1 justify-between my-3">
        <h1>Admin List</h1>
        {/* Search */}
        <div>
          <label for="search" class="text-sm font-medium text-heading sr-only ">
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
              <svg
                class="w-4 h-4 text-body"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="2"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              class="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-2xl focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              placeholder="Search"
              onInput={(e) => setSearchInput(e.currentTarget.value)}
              required
            />
          </div>
        </div>
      </div>

      {/* Table */}

      <table class="w-full min-w-full border-collapse block md:table ">
        <thead class="my-8">
          <tr>
            <For each={props.columns}>
              {(col) => (
                <th
                  class="cursor-pointer text-left border-b-2 border-default-medium p-3 text-sm font-semibold text-heading bg-gray-100"
                  onClick={() => toggleSort(col)}
                >
                  {col.header}
                  <Show when={query.sortBy === col.key}>
                    {query.sortOrder === "ASC" ? " ▲" : " ▼"}
                  </Show>
                </th>
              )}
            </For>
          </tr>
        </thead>

        <tbody>
          <Show when={!data.loading} fallback={<tr>{tableLoader}</tr>}>
            <For each={data()?.data}>
              {(row) => (
                <tr>
                  <For each={props.columns}>
                    {(col) => (
                      <td class="cursor-pointer text-left border-b-2 border-default-medium p-3 text-sm font-semibold text-heading bg-gray-200">
                        {col.render ? col.render(row) : (row as any)[col.key]}
                      </td>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </Show>
        </tbody>
      </table>

      {/* Pagination */}

      <Show when={data()} fallback={tableLoader}>
        {(d) => (
          <div class="flex flex-1 justify-around my-5">
            <button
              disabled={query.pageNum === 0}
              onClick={() => setQuery("pageNum", query.pageNum - 1)}
            >
              Prev
            </button>

            <span>
              Page {d().meta.currentPage + 1} / {d().meta.totalPages}
            </span>

            <button
              disabled={query.pageNum + 1 >= d().meta.totalPages}
              onClick={() => setQuery("pageNum", query.pageNum + 1)}
            >
              Next
            </button>
          </div>
        )}
      </Show>
    </div>
  );
}
