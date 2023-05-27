import Web3 from 'web3';
import { Web3Eth, IWeb3Encrypt, IWeb3Decrypt } from '../src/web3Eth';

describe('Web3Eth', () => {
  let web3Eth: Web3Eth;
  let keystoreJson: any;
  const password = 'test!';

  beforeEach(() => {
    // Mock the provider for testing
    web3Eth = new Web3Eth('http://localhost:8545');
  });

  describe('encrypt', () => {
    it('should encrypt the wallet private key', () => {
      const privateKey = '0x1234567890abcdef';

      const params: IWeb3Encrypt = {
        privateKey,
        password,
      };

      const encryptedKey = web3Eth.encrypt(params);
      keystoreJson = encryptedKey;

      expect(encryptedKey).toBeDefined();
      expect(encryptedKey.address).toBeDefined();
      expect(encryptedKey.crypto).toBeDefined();
      expect(encryptedKey.crypto.ciphertext).toBeDefined();
      expect(encryptedKey.crypto.cipherparams).toBeDefined();
      expect(encryptedKey.crypto.kdf).toBeDefined();
      expect(encryptedKey.crypto.mac).toBeDefined();
      expect(encryptedKey.crypto.cipher).toBeDefined();
      expect(encryptedKey.version).toBeDefined();
    });

    it('should throw an error if encryption fails', () => {
      const privateKey = '';

      const params: IWeb3Encrypt = {
        privateKey,
        password,
      };

      expect(() => {
        web3Eth.encrypt(params);
      }).toThrow();
    });
  });

  describe('decrypt', () => {
    it('should decrypt the wallet private key', () => {
      const params: IWeb3Decrypt = {
        keystoreJson,
        password,
      };

      const wallet = web3Eth.decrypt(params);

      expect(wallet).toBeDefined();
      expect(wallet.privateKey).toBe('0x1234567890abcdef');
      expect(wallet.address).toBeDefined();
    });

    it('should throw an error if decryption fails', () => {
      const keystoreJson = {};

      const params: IWeb3Decrypt = {
        keystoreJson,
        password,
      };

      expect(() => {
        web3Eth.decrypt(params);
      }).toThrow();
    });
  });
});
