import { HdWallet, IHdWallet } from '../src/hdWallets';
import hdkey from 'hdkey';
import * as bip39 from 'bip39';
import * as ethUtil from 'ethereumjs-util';

describe('HdWallet', () => {
  let hdWallet: HdWallet;

  beforeEach(() => {
    hdWallet = new HdWallet();
  });

  describe('generateMnemonic', () => {
    it('should generate a random mnemonic phrase', () => {
      const mnemonic = hdWallet.generateMnemonic();
      expect(mnemonic).toBeTruthy();
    });

    it('should throw an error if bip39 fails to generate mnemonic', () => {
        const mockBip39GenerateMnemonic = jest.spyOn(bip39, 'generateMnemonic');
        mockBip39GenerateMnemonic.mockImplementation(() => {
            throw new Error('Error generating mnemonic');
        });

        // Assert that calling generateMnemonic throws an error
        expect(() => {
            hdWallet.generateMnemonic();
        }).toThrow('Error generating mnemonic');

        // Restore the original implementation
        mockBip39GenerateMnemonic.mockRestore();
    });
  });

  describe('generateHDWallets', () => {
    it('should generate multiple HD wallets', () => {
      const numOfWallets = 3;
      const mnemonic = hdWallet.generateMnemonic();
      const hdPath= "m/44'/60'/0'/0";
      const param: IHdWallet = {
        mnemonic,
        numOfWallets,
        hdPath
      };

      const wallets = hdWallet.generateHDWallets(param);
      expect(wallets.length).toBe(numOfWallets);
      wallets.forEach((wallet, index) => {
        const { address, privateKey } = wallet;
        
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const hdWallet = hdkey.fromMasterSeed(seed);
        const expectedWallet = hdWallet.derive(hdPath + '/' + index);
        const expectedPrivateKey = hdWallet.privateKey.toString('hex');
        const pubKey = ethUtil.privateToPublic(expectedWallet.privateKey);
        const addr = ethUtil.publicToAddress(pubKey).toString('hex');
        const expectedAddress = ethUtil.toChecksumAddress(`0x${addr}`);

        expect(privateKey).toBe(expectedPrivateKey);
        expect(address).toBe(expectedAddress);
      });
    });

    it('should throw an error if generate hd wallets fails', () => {
        const mockBip39MnemonicToSeedSync = jest.spyOn(bip39, 'mnemonicToSeedSync');
        mockBip39MnemonicToSeedSync.mockImplementation(() => {
            throw new Error('Error generate hd wallets');
        });

        const numOfWallets = 3;
        const mnemonic = hdWallet.generateMnemonic();
        const param: IHdWallet = {
            mnemonic,
            numOfWallets
        };
        // Assert that calling generateMnemonic throws an error
        expect(() => {
            hdWallet.generateHDWallets(param);
        }).toThrow('Error generate hd wallets');

        // Restore the original implementation
        mockBip39MnemonicToSeedSync.mockRestore();
    });
  });
});
