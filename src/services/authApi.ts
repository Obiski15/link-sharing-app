import { LoginInputs, SignUpInputs } from "@/app/(auth)/types";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}/auth`;

export async function signup(data: SignUpInputs) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function login(data: LoginInputs) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}

export async function logout() {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
  });

  const result = await res.json();

  if (!res.ok) throw result;

  return result;
}
