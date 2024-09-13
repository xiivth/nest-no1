import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { readFileSync } from 'fs';
import { createHash } from 'crypto';
import { EthersService } from 'src/shared/ethers/ethers.service';

@Injectable()
export class CertificatesService {
  constructor(private readonly ethersService: EthersService) {}

  create(createCertificateDto: CreateCertificateDto) {
    console.log(createCertificateDto);
    return 'This action adds a new certificate';
  }

  findAll() {
    return `This action returns all certificates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} certificate`;
  }

  update(id: number, updateCertificateDto: UpdateCertificateDto) {
    console.log(updateCertificateDto);
    return `This action updates a #${id} certificate`;
  }

  remove(id: number) {
    return `This action removes a #${id} certificate`;
  }

  async verify(): Promise<JSON> {
    try {
      const certificate = JSON.parse(
        readFileSync(process.env.CERTIFICATE_FILE, 'utf8'),
      );
      const certificateJson = JSON.stringify(certificate.certificateJson);

      if (
        `0x${createHash('sha256').update(certificateJson).digest('hex')}` !==
          certificate.certificateHash ||
        certificate.certificateHash !== certificate.signature.leaf
      ) {
        throw new Error('Certificate data conflict');
      }

      const document = JSON.parse(certificateJson);

      const root = certificate.signature.root;
      const proofs = certificate.signature.proofs;
      const leaf = certificate.signature.leaf;

      const result = await this.ethersService.readContractData(
        'verifyLeaf',
        root,
        proofs,
        leaf,
      );

      if (result) {
        return document;
      } else {
        throw new Error('verify cetificate failure');
      }
    } catch (error) {
      // throw new Error(error);
      return JSON.parse(`{"error": "${error}"}`);
      // return `{"error": "${error}"}`;
    }
  }

  async issue(maxTransactionFee: string, root: string): Promise<string> {
    // try {
    const transactionHash = await this.ethersService.sendContractTransaction(
      'addRoot',
      maxTransactionFee,
      root,
    );
    return transactionHash;
    // } catch (error) {
    //   throw error;
    // throw new Error('error');
    // return JSON.parse(`{"error": "${error}"}`);
    // }
  }
}
