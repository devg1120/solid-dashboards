export async function loginFetch(email: string, password: string) {
  const resp = await fetch("http://localhost:3001/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!resp.ok) {
    const error = await resp.json().catch(() => "");
    throw new Error(error.message || "Login failed");
  }

  return resp.json();
}
