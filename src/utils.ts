import { Contract } from 'fuels';
import { JsonAbiFunctionType } from './types';

export const isFunctionWritingToStorage = (fn: JsonAbiFunctionType) => {
  const { attributes } = fn;
  const storage = attributes?.find((attr) => attr.name === 'storage');
  const args = storage?.arguments;
  const isWritingToStorage = args?.find((arg) => arg === 'write');
  return !!isWritingToStorage;
};

export const shouldCallOrSimulate = (fn: JsonAbiFunctionType) => {
  const writingToStorage = isFunctionWritingToStorage(fn);
  if (writingToStorage) {
    return 'call';
  } else {
    return 'simulate';
  }
};

export const executeContractCall = async ({
  contract,
  fn,
  args,
}: {
  contract: Contract;
  fn: JsonAbiFunctionType;
  args: any[];
}) => {
  const { name } = fn;
  const callOrSimulate = shouldCallOrSimulate(fn);

  return contract.functions[name](...args)
    .txParams({
      gasPrice: 1,
      gasLimit: 20_000,
    })
    [callOrSimulate]();
};
