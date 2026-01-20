const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCandidates() {
  const res = await fetch(`${BASE_URL}/candidates`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET failed ${res.status}: ${text}`);
  }
  return res.json();
}

export async function saveCandidate(payload) {
  const method = payload.id ? "PUT" : "POST";
  const url = payload.id
    ? `${BASE_URL}/candidates/${payload.id}`
    : `${BASE_URL}/candidates`;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SAVE failed ${res.status}: ${text}`);
  }

  return res.json();
}

export async function deleteCandidate(id) {
  const res = await fetch(`${BASE_URL}/candidates/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DELETE failed ${res.status}: ${text}`);
  }

  return true;
}
