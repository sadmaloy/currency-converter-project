import React, { useEffect, useState } from 'react';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

type CurrenciesResponse = {
  result: string;
  conversion_rates: Record<string, number>;
};

function ConverterPage(): JSX.Element {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [amountRUB, setAmountRUB] = useState<number>(0);
  const [amountOther, setAmountOther] = useState<number>(0);

  const getAllСurrencies = async (): Promise<void> => {
    try {
      const response: AxiosResponse<CurrenciesResponse> = await axios.get(
        'https://v6.exchangerate-api.com/v6/e59c5033d86a308dd9f13177/latest/RUB',
      );
      if (response.status === 200) {
        const requiredCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];
        const filteredRates: Record<string, number> = {};
        requiredCurrencies.forEach((currency) => {
          filteredRates[currency] = response.data.conversion_rates[currency];
        });
        setRates(filteredRates);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axios.isAxiosError(axiosError)) {
        throw new Error(axiosError.message);
      }
      throw new Error('Some error');
    }
  };

  // useEffect(() => {
  //   void getAllСurrencies();
  // }, []);

  const onHandleAmountRUBChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseFloat(e.target.value) || 0;
    setAmountRUB(value);
    if (rates[selectedCurrency]) {
      setAmountOther(parseFloat((value * rates[selectedCurrency]).toFixed(5)));
    }
  };

  const onHandleAmountOtherChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseFloat(e.target.value) || 0;
    setAmountOther(value);
    if (rates[selectedCurrency]) {
      setAmountRUB(parseFloat((value / rates[selectedCurrency]).toFixed(5)));
    }
  };

  const onHandleSelectedCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const currency = e.target.value;
    setSelectedCurrency(currency);
    if (rates[currency]) {
      setAmountOther(parseFloat((amountRUB * rates[currency]).toFixed(5)));
    }
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <input type="number" value={amountRUB} onChange={onHandleAmountRUBChange} />
        <span>RUB</span>
      </div>
      <div>
        <input type="number" value={amountOther} onChange={onHandleAmountOtherChange} />
        <select value={selectedCurrency} onChange={onHandleSelectedCurrencyChange}>
          {['USD', 'EUR', 'GBP'].map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ConverterPage;
