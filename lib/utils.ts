/** generateSalt return a random array of 96 bytes */
export function generateSalt(): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(96));
}

/** pbkdf2 returns a hashed password (PBKDF2-HMAC-SHA256) */
export async function pbkdf2(
  password: string,
  salt: Uint8Array,
  iterations = 1024,
  length = 128
): Promise<Uint8Array> {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(password);

  const baseKey = await crypto.subtle.importKey(
    'raw',
    encoded,
    'PBKDF2',
    false,
    ['deriveKey']
  );

  // PBKDF2-HMAC-SHA256
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: salt.buffer,
      iterations,
    },
    baseKey,
    {
      name: 'HMAC',
      hash: 'SHA-256',
      length,
    },
    true,
    ['sign']
  );

  const result = await crypto.subtle.exportKey('raw', key);
  return new Uint8Array(result);
}

export function toBase64(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function fromBase64(data: string): Uint8Array {
  const binStr = atob(data);
  const arr = new Uint8Array(binStr.length);
  const len = binStr.length;
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return arr;
}

/** decryptAes decrypt some data. Use TextEncoder/TextDecoder to convert to string */
export async function decryptAes(
  data: Uint8Array,
  rawKey: Uint8Array,
  iv: Uint8Array
) {
  // const encoder = new TextEncoder();
  // const encoded = encoder.encode(data);

  const key = await crypto.subtle.importKey(
    'raw',
    rawKey.buffer,
    'AES-CBC',
    false,
    ['encrypt', 'decrypt']
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-CBC',
      iv,
      length: 128,
    },
    key,
    data
  );

  return decrypted;
}

/** encryptAes encrypt some string. Use TextEncoder/TextDecoder to convert to string */
export async function encryptAes(
  data: Uint8Array,
  rawKey: Uint8Array,
  iv: Uint8Array | null = null
) {
  // const encoder = new TextEncoder();
  // const encoded = encoder.encode(data);
  if (iv == null) {
    iv = crypto.getRandomValues(new Uint8Array(16));
  }

  const key = await crypto.subtle.importKey(
    'raw',
    rawKey.buffer,
    'AES-CBC',
    false,
    ['encrypt', 'decrypt']
  );

  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-CBC',
      iv,
      length: 128,
    },
    key,
    data
  );

  return { encrypted, iv };
}
