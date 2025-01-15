import { Address, Signer, Tap, Tx, Script } from '@cmdcode/tapscript';
import { keys } from '@cmdcode/crypto-utils';
import {
  textToHex,
  encodeBase64,
  base64ToHex,
  hexToBytes,
  bytesToHex,
  createLittleEndianInteger,
} from './utils';

export const generatePrivateKey = (): string => {
  const privkey = keys.gen_seckey();
  const privString = bytesToHex(privkey);
  return privString;
};

export const generteFiles = async (list: any[]) => {
  const files: any[] = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const file = item;
    const { type, content, label } = item;
    if (type === 'text') {
      const _value = content?.trim();
      file.mimetype = 'text/plain;charset=utf-8';
      file.hex = textToHex(_value);
      file.label = label || _value;
    } else if (type === 'file') {
      let mimetype = content.type?.trim();
      if (mimetype.includes('text/plain')) {
        mimetype += ';charset=utf-8';
      }
      const b64 = (await encodeBase64(content)) as string;
      const base64 = b64.substring(b64.indexOf('base64,') + 7);
      const hex = base64ToHex(base64);
      file.mimetype = mimetype;
      file.hex = hex;
      file.label = label || content.name;
      delete file.content;
    }
    file.amount = file.amount || 330;
    file.offset = file.offset || 0;
    const contentBytes = hexToBytes(file.hex);
    let txsize = Math.floor(23 + contentBytes.length / 4);
    file.txsize = txsize;
    files.push(file);
  }
  return files;
};

export const generateMultiScript = (
  pubkey: any,
  files: any[],
  metadata?: any,
) => {
  const ec = new TextEncoder();
  let script: any = [];
  const startScript = [pubkey, 'OP_CHECKSIG'];

  files.forEach((file) => {
    const content = hexToBytes(file.hex);
    const mimetype = ec.encode(file.mimetype);
    const offset = file.offset || 0;
    script.push(...['OP_0', 'OP_IF', ec.encode('ord'), '01', mimetype]);
    if (offset > 0) {
      script.push(...['02', createLittleEndianInteger(offset)]);
    }
    script.push(...['OP_0', content, 'OP_ENDIF']);
  });
  script = [...startScript, ...script];
  return script;
};

interface Inscription {
  leaf: string;
  tapkey: string;
  cblock: string;
  address: string;
  size: number;
}
export const generateInscription = ({
  files,
  secret,
  network = 'main',
  metadata,
}: {
  files: any[];
  feeRate: number;
  secret: string;
  network: any;
  metadata?: any;
}) => {
  const seckey = keys.get_seckey(secret);
  const pubkey = keys.get_pubkey(seckey, true);
  const script = generateMultiScript(pubkey, files, metadata);
  console.log('script', script);

  const leaf = Tap.encodeScript(script);
  const [tapkey, cblock] = Tap.getPubKey(pubkey, { target: leaf });
  const inscriptionAddress = Address.p2tr.fromPubKey(tapkey, network);
  const txsize = 64 + 33 + Script.encode(script).length;
  const inscription: Inscription = {
    leaf: leaf,
    tapkey: tapkey,
    cblock: cblock,
    address: inscriptionAddress,
    size: txsize,
  };
  return inscription;
};

interface CalcVSizeParams {
  inputsLength?: number;
  outputsLength: number;
  inscriptionSize: number;
}
export const calcInscriptionVSize = ({
  inputsLength = 1,
  outputsLength,
  inscriptionSize,
}: CalcVSizeParams): number => {
  const txHeaderSize = 12;
  const inputSize = 41;
  const outputSize = 52;
  const witnessSize = inscriptionSize;

  const strippedSize =
    txHeaderSize + inputSize * inputsLength + outputSize * outputsLength;

  const totalWeight = strippedSize * 4 + witnessSize * inputsLength;
  const vSize = Math.ceil(totalWeight / 4);

  return vSize;
};

interface InscribeParams {
  secret: any;
  inscription: Inscription;
  commitTx: {
    txid: string;
    vout: number;
    value: number;
  };
  files: any[];
  metadata?: any;
  toAddresses: string[];
  network: string;
}
/**
 * The `inscribe` function in TypeScript handles the creation and signing of a transaction for a
 * specific network with various parameters and outputs.
 * @param {InscribeParams}  - The `inscribe` function takes in several parameters to create and
 * broadcast a transaction on the blockchain. Here is a breakdown of each parameter:
 * @returns The `inscribe` function is returning the result of pushing the transaction to the network
 * using `ordx.pushTx({ hex: Tx.encode(txdata).hex, network })`.
 */

export const inscribe = async ({
  inscription,
  commitTx,
  toAddresses,
  secret,
  files,
  metadata,
}: InscribeParams) => {
  const seckey = keys.get_seckey(secret);
  const pubkey = keys.get_pubkey(seckey, true);
  const { cblock, tapkey, leaf } = inscription;
  let outputs = files.map((f, i) => {
    const toAddress =
      toAddresses?.length === 1 ? toAddresses[0] : toAddresses[i];
    return {
      value: f.amount,
      scriptPubKey: Address.toScriptPubKey(toAddress),
    };
  });

  const txdata = Tx.create({
    vin: [
      {
        txid: commitTx.txid,
        vout: commitTx.vout,
        prevout: {
          value: commitTx.value,
          scriptPubKey: ['OP_1', tapkey],
        },
      },
    ],
    vout: outputs,
  });

  const sig = Signer.taproot.sign(seckey, txdata, 0, { extension: leaf });
  const script = generateMultiScript(pubkey, files, metadata);

  txdata.vin[0].witness = [sig, script, cblock];
  const isValid = Signer.taproot.verify(txdata, 0, { pubkey, throws: true });
  console.log('isValid', isValid);

  if (!isValid) {
    throw new Error('Invalid signature');
  }
  return Tx.encode(txdata).hex;
};
