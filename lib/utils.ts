import { decode64, encode64 } from './base64';

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
  return encode64(bytes);
}

export function fromBase64(input: string): Uint8Array {
  return decode64(input);
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

/** calculateFileKey take the sha1 of a file (hex encoded) and return its fkey */
export async  function calculateFileKey(sha1: string) {
  sha1 = sha1.toLowerCase();
  const enc = new TextEncoder();
  const data = await pbkdf2(
    sha1,
    enc.encode(
      '={w|>6L:{Xn;HAKf^w=,fgSX}sfw)`hxopaqk.6Hg\';w23"sd+b07`LSOGqz#-)['
    ),
    32,
    144
  );
  return toBase64(data);
}

/** calculateFileId take the sha1 of a file (hex encoded) and return its fid */
export async function calculateFileId(sha1: string) {
  sha1 = sha1.toLowerCase();
  const enc = new TextEncoder();
  const data = await pbkdf2(
    sha1,
    enc.encode(
      "5%;[yw\"XG2&Om#i*T$v.B2'Ae/VST4t#u$@pxsauO,H){`hUd7Xu@4q4WCc<>'ie"
    ),
    32,
    144
  );
  return toBase64(data);
}
