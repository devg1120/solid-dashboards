import { createEffect, createSignal } from "solid-js";

export default function ParentNavItem(props: any) {
    // Features:
    // Accepts MenuItems as children
    // Is highlighted when clicked on
    // Opens up a menu that extends that dashboard
    const title = () => props.title;
    const children = () => props.children;
    const icon = () => props.icon;
    const path = () => props.path;
    const { setDashboardState, dashboardState } = props;
    let popupRef: any;

    const [submenuOpen, setSubmenuOpen] = createSignal(false);

    const handleParentItemClick = () => {
        if (!dashboardState().includes(path())) {
            setDashboardState(path());
        }
        setSubmenuOpen(!submenuOpen());
    };

    createEffect(() => {
        if (dashboardState() !== path) {
            setSubmenuOpen(false);
        }
    });

    createEffect(() => {
        document.addEventListener("click", (e) => {
            console.log(popupRef.nextElementSibling)
            if (!popupRef.previousElementSibling.contains(e.target) && e.target !== popupRef) {
                setSubmenuOpen(false)
            }
        })
    })

    return (
        <>
            <button
                onMouseDown={handleParentItemClick}
                class={`btn ${submenuOpen() || dashboardState().includes(path() + "/") ? "btn-neutral" : "btn-ghost"
                    } w-full justify-start`}>
                <span class="w-[20px] h-auto [&>*]:fill-current">{icon() ? icon() : ""}</span>
                {title()}
            </button>
            <div
                ref={popupRef}
                class={`${submenuOpen() ? "visible opacity-[100%] translate-x-0" : "-translate-x-10 invisible opacity-0 "} transition-all duration-200 bg-base-100 w-[250px] h-[100vh] border-base-300 border-r-2 fixed left-[250px] top-0 py-10 px-5 flex flex-col gap-3 z-10`}>
                {children()}
            </div>
        </>
    );
}
