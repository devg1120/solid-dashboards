import { A } from "@solidjs/router";

export default function NavItem(props: any) {
    const { title, path, active, icon, setDashboardState } = props;

    const handleClick = () => {
        setDashboardState(path);
    };

    return (
        <A
            onClick={handleClick}
            class={`${active(path)} w-full flex flex-row justify-start flex-nowrap`}
            href={path}>
            <span class="w-[20px] h-auto [&>*]:fill-current ">{icon ? icon : ""}</span>
            {title}
        </A>
    );
}
