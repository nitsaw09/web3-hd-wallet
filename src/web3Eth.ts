import Web3 from 'web3';

export interface IWeb3Encrypt {
    privateKey: string;
    password: string;
}

export interface IWeb3Decrypt {
    keystoreJson: any;
    password: string;
}

export class Web3Eth {
    web3;
    constructor(provider: any) {
        const httpProvider = new Web3.providers.HttpProvider(provider);
        this.web3 = new Web3(httpProvider);
    }

    // encrypt the wallet private key
    encrypt(params: IWeb3Encrypt) {
        try {
            const keystoreJson = this.web3.eth.accounts.encrypt(params.privateKey, params.password);
            return keystoreJson;
        } catch (err) {
            throw err;
        } 
    }

    //decrypt the wallet private key
    decrypt(params: IWeb3Decrypt) {
        try {
            const wallet = this.web3.eth.accounts.decrypt(params.keystoreJson, params.password);
            return wallet;
        } catch (err) {
            throw err;
        }  
    }
}