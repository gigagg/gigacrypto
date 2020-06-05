export function generateSalt() {
  return crypto.getRandomValues(new Uint8Array(96));
}

export async function pbkdf2(
  password: string,
  salt: Uint8Array,
  iterations = 1024,
  length = 128
) {
  // return codec.base64.fromBits(misc.pbkdf2(password, salt, 1024, 128));

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

  const rawKey = await crypto.subtle.exportKey('raw', key);

  return uint8ToBase64(rawKey);
}

function uint8ToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const len = buffer.byteLength;
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

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

export async function encryptAes(data: string, rawKey: Uint8Array) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(data);
  const iv = crypto.getRandomValues(new Uint8Array(16));

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
    encoded
  );

  return { encrypted, iv };
}
