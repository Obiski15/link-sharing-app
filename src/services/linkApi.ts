const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}/link`;

export async function getLinks() {
  const res = await fetch(`${BASE_URL}`, {
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function deleteLink(id: string) {
  const res = await fetch(`${BASE_URL}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return null;
}

export async function addLink(data: object) {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function updateLink(data: object) {
  const res = await fetch(`${BASE_URL}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function getPreview(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`);

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}
