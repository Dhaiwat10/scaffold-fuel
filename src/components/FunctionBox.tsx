import { useFunctions } from '@/hooks/useFunctions';
import { FuelContext } from '@/pages/_app';
import { JsonAbiFunctionType } from '@/types';
import { executeContractCall, isFunctionWritingToStorage } from '@/utils';
import { useContext, useState } from 'react';

export const FunctionBox = ({ fn }: { fn: JsonAbiFunctionType }) => {
  const { contract } = useContext(FuelContext);

  const handleExecute = async () => {
    if (!contract) {
      return;
    }
    const { value } = await executeContractCall({ contract, fn, args: [] });
    alert(value ? value.toString() : 'Success');
  };

  return (
    <div className='border px-4 py-2 rounded-lg flex flex-col gap-4'>
      <span className='text-lg font-bold'>{fn.name}</span>
      <input className='border rounded-lg px-2 py-1' placeholder='Input' />
      <button onClick={handleExecute} className='border rounded-lg px-2 py-1'>
        Execute
      </button>
      <pre>{JSON.stringify(fn, null, 2)}</pre>
    </div>
  );
};
