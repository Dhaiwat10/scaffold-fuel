import { useFunctions } from '@/hooks/useFunctions';
import { FuelContext } from '@/pages/_app';
import { JsonAbiFunctionType } from '@/types';
import { executeContractCall, isFunctionWritingToStorage } from '@/utils';
import { useContext, useState } from 'react';

export const FunctionBox = ({ fn }: { fn: JsonAbiFunctionType }) => {
  const [argsInput, setArgsInput] = useState<string>('');
  const [callResult, setCallResult] = useState<string>('');
  const { contract } = useContext(FuelContext);

  const handleExecute = async () => {
    if (!contract) {
      return;
    }
    const { value } = await executeContractCall({
      contract,
      fn,
      args: argsInput.split(','),
    });
    setCallResult(value.toString());
  };

  const numberOfInputs = fn.inputs.length;

  return (
    <div className='border px-4 py-2 rounded-lg flex flex-col gap-4'>
      <span className='text-lg font-bold'>{fn.name}</span>
      {numberOfInputs > 0 && (
        <input
          value={argsInput}
          onChange={(e) => setArgsInput(e.target.value)}
          className='border rounded-lg px-2 py-1'
          placeholder='Input'
        />
      )}

      <button onClick={handleExecute} className='border rounded-lg px-2 py-1'>
        Execute
      </button>
      {callResult && (
        <>
          <span className='text-sm font-bold'>Result:</span>
          <pre>{JSON.stringify(callResult, null, 2)}</pre>
        </>
      )}

      {/* <span className='text-sm font-bold'>Function:</span>
      <pre>{JSON.stringify(fn, null, 2)}</pre> */}
    </div>
  );
};
