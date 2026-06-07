import { useLocation } from "@solidjs/router";
import NavItem from "./dashboard/NavItem";

import HomeIcon from "~/assets/dashboard/HomeIcon.svg";
import PieChartIcon from "~/assets/dashboard/PieChartIcon.svg";
import SettingsIcon from "~/assets/dashboard/SettingsIcon.svg";
import MoneyIcon from "~/assets/dashboard/MoneyIcon.svg";
import BPSIcon from "~/assets/dashboard/BPSIcon.svg";
import MailIcon from "~/assets/dashboard/MailIcon.svg";
import LogoutIcon from "~/assets/dashboard/LogoutIcon.svg";
import ParentNavItem from "./dashboard/ParentNavItem";
import { createEffect, createSignal } from "solid-js";
import ThemeController from "./ThemeController";

export default function Nav() {
    const location = useLocation();

    const [dashboardState, setDashboardState] = createSignal(location.pathname);

    createEffect(() => {
        console.log(dashboardState());
    });

    const active = (path: string) =>
        path == location.pathname && path == dashboardState() ? "btn btn-neutral" : "btn btn-ghost";

    return (
        <nav class="h-[100vh] min-w-[250px] flex flex-col items-start py-6 px-5 gap-2 border-r-2 border-base-300 z-20">
            <div class="mb-10 px-4">
                <BPSIcon
                    fill="currentColor"
                    height={60}
                    width={60}
                />
            </div>

            <NavItem
                setDashboardState={setDashboardState}
                title="Home"
                path="/"
                active={active}
                icon={HomeIcon}
            />

            <ParentNavItem
                setDashboardState={setDashboardState}
                dashboardState={dashboardState}
                title="Assets"
                path="/assets"
                currentPath={location.pathname}
                icon={PieChartIcon}>
                <NavItem
                    setDashboardState={setDashboardState}
                    title="Mining Pools"
                    path="/assets/pools"
                    active={active}
                    icon={PieChartIcon}
                />
                <NavItem
                    setDashboardState={setDashboardState}
                    title="Wallets"
                    path="/assets/wallets"
                    active={active}
                    icon={PieChartIcon}
                />
            </ParentNavItem>

            <ParentNavItem
                setDashboardState={setDashboardState}
                dashboardState={dashboardState}
                title="Payments"
                path="/payments"
                icon={MoneyIcon}
                currentPath={location.pathname}>
                <NavItem
                    setDashboardState={setDashboardState}
                    title="Upcoming Bills"
                    path="/payments/upcoming"
                    active={active}
                    icon={MoneyIcon}
                />
                <NavItem
                    setDashboardState={setDashboardState}
                    title="Make Payment"
                    path="/payments/make-payment"
                    active={active}
                    icon={MoneyIcon}
                />
                <NavItem
                    setDashboardState={setDashboardState}
                    title="Past Transactions"
                    path="/payments/past-transactions"
                    active={active}
                    icon={MoneyIcon}
                />
            </ParentNavItem>

            <NavItem
                setDashboardState={setDashboardState}
                title="Settings"
                path="/settings"
                active={active}
                icon={SettingsIcon}
            />

            <span class="mt-auto mx-auto my-1">
                <ThemeController />

            </span>
            <a
                href="mailto:company@email.com"
                class="btn btn-sm btn-neutral btn-outline w-full">
                <MailIcon
                    height={15}
                    width={15}
                    fill="currentColor"
                />
                Contact Us
            </a>
            <button class="btn btn-sm btn-error btn-outline w-full">
                <LogoutIcon
                    height={15}
                    width={15}
                    fill="currentColor"
                />
                Logout
            </button>
        </nav>
    );
}
