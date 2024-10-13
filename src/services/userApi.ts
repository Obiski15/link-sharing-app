const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}/auth/user`;

export async function getUser() {
  const res = await fetch(`${BASE_URL}`, {
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result.data;
}

export async function updateUser(data: {
  firstName: string;
  lastName: string;
  image: File | null;
}) {
  const formData = new FormData();

  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);

  if (data.image) {
    formData.append("image", data.image);
  }

  const res = await fetch(`${BASE_URL}`, {
    method: "PATCH",
    body: formData,
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result.data;
}

export async function getUserPreview(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`);

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}
