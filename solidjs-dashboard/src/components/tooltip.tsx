import { createSignal, JSX, Show } from "solid-js";

type TooltipProps = {
  text: string;
  children: JSX.Element;
  position?: "top" | "bottom" | "left" | "right";
};

export default function Tooltip(props: TooltipProps) {
  const [visible, setVisible] = createSignal(false);

  const positionClasses = () => {
    switch (props.position) {
      case "bottom":
        return "top-full mt-2 left-1/2 -translate-x-1/2";
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2";
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2";
      default:
        return "bottom-full mb-2 left-1/2 -translate-x-1/2";
    }
  };

  return (
    <div
      class="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {props.children}

      <Show when={visible()}>
        <div
          role="tooltip"
          class={`absolute z-50 whitespace-nowrap px-3 py-2 text-sm font-medium text-white bg-dark rounded-base shadow-xs transition-opacity duration-200 ${positionClasses()}`}
        >
          {props.text}
        </div>
      </Show>
    </div>
  );
}
