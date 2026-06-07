import { A } from "@solidjs/router";
import { FiHome, FiUser } from "solid-icons/fi";
import { ImExit } from "solid-icons/im";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "solid-icons/hi";
import { createSignal, For, Show, ValidComponent } from "solid-js";
import { Dynamic } from "solid-js/web";
import Tooltip from "../components/tooltip";

const [isSidebarOpen, setIsSidebarOpen] = createSignal(true);
export const DashboardLayout = (props: { children: any }) => {
  return (
    <>
      <div class={`flex h-screen`}>
        <div
          class={`transition-all duration-300 bg-gray-800 text-white px-4 py-2 h-screen ${isSidebarOpen() ? "w-64" : "w-16"}`}
        >
          <div class="sidebar-header h-12 flex justify-around items-center">
            <Show when={isSidebarOpen()}>
              <h2 class="text-xl font-bold">Dashboard</h2>
            </Show>
            <button
              class="p-1 rounded hover:bg-gray-700 transition-colors duration-300"
              onClick={() => setIsSidebarOpen(!isSidebarOpen())}
            >
              <HiOutlineChevronLeft
                size={30}
                class={` transition-transform duration-300 ${isSidebarOpen() ? "" : "rotate-180"}`}
              />
            </button>
          </div>
          <ul class="overflow-y-auto h-[calc(100%-6rem)] scrollbar-thin py-2">
            <SidebarItem icon={FiHome} label="Home" url="/" />
            <SidebarItem icon={FiUser} label="Admin List" url="/admin-list" />

            <For each={Array(50)}>
              {(item, index) => (
                <SidebarItem
                  icon={FiHome}
                  label={`Example ${index() + 1}`}
                  url={`/example/${index()}`}
                />
              )}
            </For>
            <SidebarItem icon={FiHome} label={`Example`} url={`/example`} />
          </ul>
          <div class="h-12  ">
            <button
              class="
            text-lg
             font-bold mt-2 
             flex items-center 
              cursor-pointer
               border border-grey-50 px-2 py-2 rounded transition-all duration-300 delay-300"
            >
              <ImExit />
              <span
                class={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isSidebarOpen()
                    ? "opacity-100 ml-2 max-w-50"
                    : "opacity-0 ml-0 max-w-0 "
                }`}
              >
                Logout
              </span>
            </button>
          </div>
        </div>
        <div class="flex-1 p-4 overflow-y-auto">{props.children}</div>
      </div>
    </>
  );
};

export const SidebarItem = (props: {
  icon: ValidComponent;
  label: string;
  url?: string;
}) => {
  return (
    <li class="mb-2">
      <A
        href={props.url || "/"}
        class="hover:underline flex items-center flex-nowrap "
      >
        <Dynamic component={props.icon} />

        <span
          class={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
            isSidebarOpen()
              ? "opacity-100 ml-2 max-w-50"
              : "opacity-0 ml-0 max-w-0"
          }`}
        >
          {props.label}
        </span>
      </A>
    </li>
  );
};
