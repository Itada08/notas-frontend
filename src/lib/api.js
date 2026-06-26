// src/lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500";

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include", // manda o cookie de sessão do Better Auth
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let message = `Erro ${res.status}`;
    try {
      const data = await res.json();
      message = data.error || message;
    } catch {
      // resposta sem corpo JSON (ex: 404 genérico)
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const notesApi = {
  list: () => apiFetch("/api/notes"),
  stats: () => apiFetch("/api/notes/stats"),
  create: (data) =>
    apiFetch("/api/notes", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) =>
    apiFetch(`/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  remove: (id) => apiFetch(`/api/notes/${id}`, { method: "DELETE" }),
};
