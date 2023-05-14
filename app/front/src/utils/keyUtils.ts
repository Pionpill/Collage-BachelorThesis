import JSEncrypt from "jsencrypt";
import { RSA_PRIV_KEY, RSA_PUB_KEY } from "../config/key";

// 私钥加密
export const encrypt = (text: string) => {
  const encrypt = new JSEncrypt();
  encrypt.setPrivateKey(RSA_PRIV_KEY);
  const encrypted = encrypt.encrypt(text);
  return encrypted;
};

// 公钥解密
export const decrypt = (text: string) => {
  const decrypt = new JSEncrypt();
  decrypt.setPublicKey(RSA_PUB_KEY);
  const decrypted = decrypt.decrypt(text);
  return decrypted;
};
