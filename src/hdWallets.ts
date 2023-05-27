import hdkey from 'hdkey';
import * as bip39 from 'bip39';
import * as ethUtil from 'ethereumjs-util';

export interface IHdWallet { 
  mnemonic: string; 
  numOfWallets: number;
  hdPath?: string; 
}

export class HdWallet {  
  
  constructor() {}

  // Generate a random mnemonic phrase
  generateMnemonic() {
    try {
      return bip39.generateMnemonic();
    } catch (err) {
      throw err;
    }
  }

  // Generate multiple HD wallets
  generateHDWallets(param: IHdWallet) {
    try {
      const { mnemonic, numOfWallets, hdPath = "m/44'/60'/0'/0" } = param;
      
      const seed = bip39.mnemonicToSeedSync(mnemonic); //creates seed buffer
      
      // Create an HD wallet from the mnemonic phrase
      const hdWallet = hdkey.fromMasterSeed(seed);
      
      const wallets = [];
      for (let i = 0; i < numOfWallets; i++) {
        const wallet = hdWallet.derive(hdPath + '/' + i);
        const privateKey = hdWallet.privateKey.toString('hex');
        const pubKey = ethUtil.privateToPublic(wallet.privateKey);
        const addr = ethUtil.publicToAddress(pubKey).toString('hex');
        const address = ethUtil.toChecksumAddress(`0x${addr}`);
        wallets.push({ address, privateKey });
      }
      return wallets;
    } catch(err) {
      throw err;
    }
  }
}
