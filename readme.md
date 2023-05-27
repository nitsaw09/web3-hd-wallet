# Web3 HD Wallet
Web3 HD Wallet is a package that provides functionality to generate HD wallets and encrypt/decrypt private keys.

## Installation
To install the package, use npm:

```bash
npm install web3-hd-wallet --save
```
## Usage

### HD Wallet 
```javascript
const { HdWallet } = require('web3-hd-wallet');

const hdWallet = new HdWallet();

const mnemonic = hdWallet.generateMnemonic();
console.log('Mnemonic:', mnemonic);

const wallets = hdWallet.generateHDWallets({
  mnemonic: mnemonic,
  numOfWallets: 3,
  hdPath: "m/44'/60'/0'/0",
});
console.log('HD Wallets:', wallets);

```
### Web3Eth
``` javascript
const { Web3Eth } = require('web3-hd-wallet');
const web3Eth = new Web3Eth('http://localhost:8545');

const encryptedKey = web3Eth.encrypt({
  privateKey: '0x1234567890abcdef',
  password: 'testpassword',
});
console.log('Encrypted Key:', encryptedKey);

const decryptedWallet = web3Eth.decrypt({
  keystoreJson: { /* Keystore JSON object */ },
  password: 'testpassword',
});
console.log('Decrypted Wallet:', decryptedWallet);

```
## API

### HD Wallet Methods
- ```generateMnemonic()```: string: Generates a random mnemonic phrase.
- ```generateHDWallets(params: IHdWallet)```: Array<{ address: string, privateKey: string }>: Generates multiple HD wallets based on the provided parameters. The params object should have the following properties:
  - ```mnemonic (string)```: The mnemonic phrase.
  - ```numOfWallets (number)```: The number of wallets to generate.
  - ```hdPath (string, optional)```: The HD derivation path (default: "m/44'/60'/0'/0").

### Web3Eth Methods
- ```encrypt(params: IWeb3Encrypt)```: any: Encrypts a wallet private key. The params object should have the following properties:
  - ```privateKey (string)```: The private key to encrypt.
  - ```password (string)```: The password used for encryption.
- ```decrypt(params: IWeb3Decrypt)```: any: Decrypts a keystore JSON. The params object should have the following properties:
  - ```keystoreJson (any)```: The keystore JSON object to decrypt.
  - ```password (string)```: The password used for decryption.
  
For detailed information about the parameters and return values, refer to the inline documentation in the source code.