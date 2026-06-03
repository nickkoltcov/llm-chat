


import {apiFetch} from './api-client';
type OpenRouterKey = { name: string; hash: string };

export async function exchangeCodeForKey(
  code: string,
  codeverifier: string,
  method: string,
): Promise<string> {
  const response = await fetch("https://openrouter.ai/api/v1/auth/keys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code: code,
      code_verifier: codeverifier,
      code_challenge_method: method,
    }),
  });
  const { key } = await response.json();

  return key;
}

export async function provisionAppKey(userToken: string) {
  const listKeys = await fetch("https://openrouter.ai/api/v1/keys", {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Content-Type": "application/json",
    },
  });

  const res = await listKeys.json();

  const existingKey = res.data.find(
    (key: OpenRouterKey) => key.name === process.env.OPENROUTER_APP_KEY_NAME,
  );

  if (existingKey) {
    const deleteKey = await fetch(
      `https://openrouter.ai/api/v1/keys/${existingKey.hash}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_PROVISIONING_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );
  }

  const createKey = await fetch("https://openrouter.ai/api/v1/keys", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_PROVISIONING_KEY}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      name: "LLM-chat",
    }),
  });

  const createdData = await createKey.json();

  return createdData.key;
}



export const getMe = async () => {
  const response = await apiFetch('/auth/me');

  if (!response.ok || response.status === 204) {
      return { authenticated: false, user: null };
    }

  const data = await response.json();
  

  return data || { authenticated: true };
}

export const logout = async () => {
  const response = await apiFetch('auth/logout', {method: 'POST'})

  return response;
}
