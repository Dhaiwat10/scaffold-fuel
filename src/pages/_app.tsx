import '@/styles/globals.css';
import { TestContractAbi, TestContractAbi__factory } from '@/sway-api';
import { darkTheme, setFuelThemes, ThemeProvider } from '@fuel-ui/react';
import { Provider, Wallet, WalletUnlocked } from 'fuels';
import type { AppProps } from 'next/app';
import { createContext, useEffect, useState } from 'react';
import contractIds from '@/sway-api/contract-ids.json';

const contractId = contractIds.testContract;

setFuelThemes({
  themes: {
    dark: darkTheme,
  },
});

export const FuelContext = createContext<{
  provider?: Provider;
  contract?: TestContractAbi;
  wallet?: WalletUnlocked;
}>({});

export default function App({ Component, pageProps }: AppProps) {
  const [provider, setProvider] = useState<Provider>();
  const [wallet, setWallet] = useState<WalletUnlocked>();
  const [contract, setContract] = useState<TestContractAbi>();

  useEffect(() => {
    (async () => {
      const provider = await Provider.create('http://127.0.0.1:4000/graphql');
      const wallet = Wallet.fromPrivateKey('0x01', provider);
      const contract = TestContractAbi__factory.connect(contractId, wallet);

      setProvider(provider);
      setWallet(wallet);
      setContract(contract);
    })();
  }, []);

  return (
    <FuelContext.Provider value={{ provider, wallet, contract }}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </FuelContext.Provider>
  );
}
