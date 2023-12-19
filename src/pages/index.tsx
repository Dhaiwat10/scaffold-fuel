import { VStack } from '@fuel-ui/react';
import { useContext } from 'react';
import { FuelContext } from './_app';
import { useFunctions } from '@/hooks/useFunctions';
import { FunctionBox } from '@/components/FunctionBox';

export default function Home() {
  const { contract } = useContext(FuelContext);
  const functions = useFunctions({ contract });

  return (
    <VStack className={`min-h-screen items-center p-24`}>
      {contract && <span>Contract ID: {contract.id.toB256()}</span>}

      <div className='flex flex-col gap-6 mt-8'>
        {functions?.map((fn) => <FunctionBox key={fn.name} fn={fn} />)}
      </div>
    </VStack>
  );
}
