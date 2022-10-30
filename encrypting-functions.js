const crypto = require( 'crypto');

export function encrypt(plain_text, key) {
  const secret = crypto.createHash('sha512').update(key, 'utf-8').digest('hex').substr(8, 32);
  const encryptionMethod = 'AES-256-CBC';
  const secret_iv = 'secret_iv'
  const iv = crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(8, 16);
  const encryptor = crypto.createCipheriv(encryptionMethod, secret, iv);
  const aes_encrypted = encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64');
  return Buffer.from(aes_encrypted).toString('base64');
};

export function decrypt(encryptedMessage, key) {
  const secret = crypto.createHash('sha512').update(key, 'utf-8').digest('hex').substr(8, 32);
  const encryptionMethod = 'AES-256-CBC';
  const secret_iv = 'secret_iv'
  const iv = crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(8, 16);
  const buff = Buffer.from(encryptedMessage, 'base64');
  encryptedMessage = buff.toString( 'utf-8');
  const decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
  return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8');
};