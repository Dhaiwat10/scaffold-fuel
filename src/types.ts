import { useFunctions } from './hooks/useFunctions';

type UseFunctionsReturnType = ReturnType<typeof useFunctions>;
export type JsonAbiFunctionType = (UseFunctionsReturnType extends
  | ReadonlyArray<infer U>
  | undefined
  ? U[]
  : never)[number];
