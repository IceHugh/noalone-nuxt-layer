// import {
//   wallet,
//   core,
//   address as addressUtils,
//   AddressType,
//   utils,
// } from 'btc-wallet-sdk';
// import { NetworkType, toPsbtNetwork } from 'btc-wallet-sdk/lib/network';

// const createEstimatePsbt = async (
//   psbt: core.bitcoin.Psbt,
//   address: string,
//   pubkey: string,
//   networkType: NetworkType,
// ): Promise<core.bitcoin.Psbt> => {
//   const addressType = addressUtils.getAddressType(address);
//   const psbtNetwork = toPsbtNetwork(networkType);
//   const clonePsbt = psbt.clone();
//   const estimatePsbt = new core.bitcoin.Psbt({ network: psbtNetwork });
//   const scriptPkBuff = addressUtils.addressToScriptPk(address, networkType);
//   for (let i = 0; i < clonePsbt.inputCount; i++) {
//     const input = clonePsbt.txInputs[i];
//     const inputData = clonePsbt.data.inputs[i];

//     if (inputData.finalScriptWitness) {
//       const finalScriptWitness = inputData.finalScriptWitness;
//       estimatePsbt.addInput({
//         hash: input.hash,
//         index: input.index,
//         witnessUtxo: inputData.witnessUtxo,
//         finalScriptWitness,
//       });
//     } else if (
//       addressType === AddressType.P2TR ||
//       addressType === AddressType.M44_P2TR
//     ) {
//       estimatePsbt.addInput({
//         hash: input.hash,
//         index: input.index,
//         witnessUtxo: {
//           value: inputData.witnessUtxo!.value,
//           script: scriptPkBuff,
//         },
//         tapInternalKey: utils.toXOnly(Buffer.from(pubkey, 'hex')),
//       });
//     } else if (
//       addressType === AddressType.P2WPKH ||
//       addressType === AddressType.M44_P2WPKH
//     ) {
//       estimatePsbt.addInput({
//         hash: input.hash,
//         index: input.index,
//         witnessUtxo: {
//           value: inputData.witnessUtxo!.value,
//           script: scriptPkBuff,
//         },
//       });
//     } else if (addressType === AddressType.P2PKH) {
//       estimatePsbt.addInput({
//         hash: input.hash,
//         index: input.index,
//         witnessUtxo: {
//           value: inputData.witnessUtxo!.value,
//           script: scriptPkBuff,
//         },
//       });
//     } else if (addressType === AddressType.P2SH_P2WPKH) {
//       const redeemData = core.bitcoin.payments.p2wpkh({
//         pubkey: Buffer.from(pubkey, 'hex'),
//       });
//       estimatePsbt.addInput({
//         hash: input.hash,
//         index: input.index,
//         witnessUtxo: {
//           value: inputData.witnessUtxo!.value,
//           script: scriptPkBuff,
//         },
//         redeemScript: redeemData.output,
//       });
//     }
//     for (let i = 0; i < clonePsbt.txOutputs.length; i++) {
//       psbt.addOutput(clonePsbt.txOutputs[i]);
//     }
//   }
//   return estimatePsbt;
// };
// const clacPsbtVirtualSize = async (
//   psbt: core.bitcoin.Psbt,
//   address: string,
//   networkType: NetworkType,
// ): Promise<number> => {
//   const addressType = addressUtils.getAddressType(address);
//   const estimateWallet = wallet.EstimateWallet.fromRandom(
//     addressType,
//     networkType,
//   );
//   const estimatePsbt = await createEstimatePsbt(
//     psbt,
//     estimateWallet.address,
//     estimateWallet.pubkey,
//     networkType,
//   );
//   const signPsbt = await estimateWallet.signPsbt(estimatePsbt, {
//     autoFinalized: true,
//   });
//   const tx = signPsbt.extractTransaction();
//   const txSize = psbt.extractTransaction(true).virtualSize();
//   return txSize;
// };
