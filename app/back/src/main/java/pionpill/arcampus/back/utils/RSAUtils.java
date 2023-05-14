package pionpill.arcampus.back.utils;

import cn.hutool.crypto.asymmetric.KeyType;
import cn.hutool.crypto.asymmetric.RSA;

public class RSAUtils {
  private static final String RSA_PRIV_KEY = """
      -----BEGIN PRIVATE KEY-----
      MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEA0WwwxuYzY8ZecxeK
      J0nIUgOMo3fPignCEEzb8dBAOmWe2DUnnj4EsGGSF3iPDLSR3HA6lpYwjq6+taqz
      Pkns4QIDAQABAkA5HbrH5GzLn4SO+zKQuIzL4W/v/XM7AKJO88dg0h1ST3pntpkl
      lAddoZE+t74ccSUJP+4T581L6T0rL3mbflxhAiEA82+edpanN4wZ7eoMbjUp+mDA
      k9z42PQd8fdf0uSNu8UCIQDcOywItZchrYh7IAfx6zsqrxcKYhsiNrOd2G+lJ/qy
      bQIhAIulXTbUJ2qTARDc8XKLJuCNfguUeGAkccUrThnxqGitAiEA2d5n543Nn3GP
      LU84zOkLNWTVhF4dvbEj7Cmr+VUdu9kCIHirWiX0Lm7OMZ9cpsDPKWa+CXHXDIpe
      2dy1hOYxvfce
      -----END PRIVATE KEY-----
      """;
  private static final String RSA_PUB_KEY = """
      -----BEGIN PUBLIC KEY-----
      MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALSk47cSjPY0qkWAg6Ji5JOFVxn7dYwA
      60J/VUwOKVrS/dl+nb1roBd0gLKvxj+r9y6DB381DVmnh0byeMS9I9ECAwEAAQ==
      -----END PUBLIC KEY-----
      """;

  // 解密密钥，用于解密前端数据
  private static final RSA decryptRSA = new RSA(RSA_PUB_KEY, null);
  // 加密密钥，用于加密后端数据
  private static final RSA encryptRSA = new RSA(null, RSA_PRIV_KEY);

  /**
   * 解密前端数据
   * 
   * @param text 数据
   * @return 解密结果
   */
  public static String decrypt(String text) {
    return new String(decryptRSA.decrypt(text, KeyType.PublicKey));
  }

  /**
   * 加密后端数据
   * 
   * @param text 数据
   * @return 解密结果
   */
  public static String encrypt(String text) {
    return new String(encryptRSA.encrypt(text, KeyType.PrivateKey));
  }
}
