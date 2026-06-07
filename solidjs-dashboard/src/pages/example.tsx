import { useParams } from "@solidjs/router";
import { Show } from "solid-js";

export default function Example() {
  const params = useParams<{ id: string }>();
  return (
    <section class="bg-green-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Example</h1>

      <p class="mt-4">This is an example page.</p>
      <Show when={params.id}>
        <p>
          <span>Example ID:</span>
          <span>&nbsp;{params.id}</span>
        </p>
      </Show>
    </section>
  );
}
