import { createSignal, createResource, Show } from "solid-js";
import { loginFetch } from "../api/auth";
import { useNavigate } from "@solidjs/router";

export default function LoginPage() {
  const navigate = useNavigate();
  const [err, setErr] = createSignal<string | null>(null);
  const [isLoading, setIsLoading] = createSignal(false);

  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    setIsLoading(true);
    try {
      const data = await loginFetch(email, password);
      setErr(null);
      navigate("/example");
    } catch (error: any) {
      console.log(error);
      setErr(String(error.message || "An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section class="bg-blue-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Login</h1>

      <p class="mt-4">This is the login page.</p>
      <Show when={err()} fallback={null}>
        <p class="text-red-500">{err()}</p>
      </Show>

      <form class="mt-4" onSubmit={handleSubmit}>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
            value="admin@gmail.com"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
            value="Admin@1234"
          />
        </div>

        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading()}
        >
          <Show when={!isLoading()} fallback={<>Logging in...</>}>
            Login
          </Show>
        </button>
      </form>
    </section>
  );
}
