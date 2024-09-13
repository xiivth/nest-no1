import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
// import * as fs from 'fs';
import { readFileSync } from 'fs';

@Injectable()
export class EthersService implements OnModuleInit {
  private provider: ethers.JsonRpcProvider;
  private signer: ethers.Wallet;
  private contract: ethers.Contract;

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

      if (!this.contract) {
        const contractABI = JSON.parse(
          // fs.readFileSync(process.env.CONTRACT_FILE, 'utf8'),
          readFileSync(process.env.CONTRACT_FILE, 'utf8'),
        );
        const contractAddress = process.env.CONTRACT_ADDR;
        this.contract = new ethers.Contract(
          contractAddress,
          contractABI,
          this.signer,
        );
        console.log('contract created');
      }
    } catch (error) {
      console.error('Error initializing Ethereum: ', error);
      throw new Error('Failed to initialize Ethereum');
    }
  }

  public async getProvider(): Promise<ethers.JsonRpcProvider> {
    if (!this.provider) {
      await this.connectEthereum();
    }
    return this.provider;
  }

  public async getSigner(): Promise<ethers.Wallet> {
    if (!this.signer) {
      await this.connectEthereum();
    }
    return this.signer;
  }

  public async getContract(): Promise<ethers.Contract> {
    if (!this.contract) {
      await this.connectEthereum();
    }
    return this.contract;
  }

  public async readContractData(
    methodName: string,
    ...args: any[]
  ): Promise<any> {
    try {
      const contract = await this.getContract();
      const result = await contract[methodName].staticCall(...args);
      // const result = await contract[methodName](...args);
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error readContractData: ', error);
      throw new Error(error.reason || error);
    }
  }

  public async sendContractTransaction(
    methodName: string,
    maxTransactionFee: string,
    ...args: any[]
  ): Promise<string> {
    try {
      const contract = await this.getContract();
      const signer = await this.getSigner();
      const provider = await this.getProvider();

      const contractAddress = await contract.getAddress();

      // Estimate gas
      let gasLimit = await signer.estimateGas({
        to: contractAddress,
        data: contract.interface.encodeFunctionData(methodName, args),
      });

      // Increase gas limit by 10%
      gasLimit = (gasLimit * BigInt(110)) / BigInt(100);

      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice;

      const estimatedTxFee = gasLimit * BigInt(gasPrice);

      // Check if estimated transaction fee exceeds the maximum allowed fee
      if (maxTransactionFee) {
        const maxTxFee = ethers.parseEther(maxTransactionFee);

        if (estimatedTxFee > maxTxFee) {
          console.log(
            `Estimated transaction fee (${ethers.formatEther(estimatedTxFee)}) exceeds the maximum allowed fee (${maxTransactionFee})`,
          );
          throw new Error('Transaction fee exceeds allowed fee');
        }
      }

      // Send transaction
      const tx = await signer.sendTransaction({
        to: contractAddress,
        data: contract.interface.encodeFunctionData(methodName, args),
        gasLimit,
        gasPrice,
      });

      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error('Transaction failed');
      }

      return receipt.hash;
    } catch (error) {
      console.error('==== sendContractTransaction ====\n', error);
      // throw new Error('Transaction failed');
      throw new Error(error.reason || error.message);
    }
  }
}
