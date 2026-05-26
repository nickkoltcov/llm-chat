export async function createSHA256CodeChallenge(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  
  const base64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
  
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_') 
    .replace(/=+$/, ''); 
}

export function generateCodeVerifier(): string {
  const array = new Uint32Array(56);
  crypto.getRandomValues(array);
  return Array.from(array, (dec) => ('0' + dec.toString(16)).substr(-2)).join('');
}
