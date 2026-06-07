import { JSX } from "solid-js";

export default function Authlayout({ children }: { children: JSX.Element }) {
  return (
    <div class="min-h-screen flex items-center justify-center">{children}</div>
  );
}
