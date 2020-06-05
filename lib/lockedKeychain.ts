export interface LockedKeychain {
  masterKey: string|null;
  password: string;
  salt: string;
  rsaKeys: {
    privateKey: string;
    publicKey: string;
    dekInfo: DekInfo;
  };
  nodeKey: string;
}

export interface DekInfo {
  type: 'AES-128-CBC:1024';
  iv: string;
  salt: string;
}
