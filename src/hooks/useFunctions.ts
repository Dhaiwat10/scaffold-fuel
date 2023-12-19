import { Contract } from 'fuels';
import { useState } from 'react';

export const useFunctions = ({ contract }: { contract?: Contract }) => {
  const functions = contract?.interface.jsonAbi.functions;

  if (!contract) {
    return;
  }

  return functions;
};
