import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class EthersService implements OnModuleInit {
  public provider: ethers.JsonRpcProvider;
  public signer: ethers.Wallet;

  async onModuleInit() {
    console.log('init EthereumModule');
    await this.connectEthereum();
  }

  async connectEthereum() {
    try {
      if (!this.provider) {
        const rpcURL = process.env.SEPOLIA_ALCHEMY;
        this.provider = new ethers.JsonRpcProvider(rpcURL);
        console.log('provider created');
      }

      if (!this.signer) {
        const privateKey = process.env.SINGER_KEY;
        this.signer = new ethers.Wallet(privateKey, this.provider);
        console.log('signer created');
      }

      // if (!contract) {
      //   const contractABI = JSON.parse(
      //     fs.readFileSync(process.env.CONTRACT_FILE),
      //   );
      //   const contractAddress = process.env.CONTRACT_ADDR;
      //   contract = new ethers.Contract(contractAddress, contractABI, signer);
      //   console.log('contract created');
      // }
    } catch (error) {
      console.error('Error initializing Ethereum:', error);
      throw new Error('Failed to initialize Ethereum');
    }
  }
}
