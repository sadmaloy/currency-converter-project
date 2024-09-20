import React, { useEffect, useState } from 'react';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

type CurrencyRate = {
  currency: string;
  rate: number;
};

type CurrenciesResponse = {
  result: string;
  conversion_rates: Record<string, number>;
};

function ConverterPage(): JSX.Element {
  const [currencies, setСurrencies] = useState<CurrencyRate[]>([]);

  const getAllСurrencies = async (): Promise<void> => {
    try {
      const response: AxiosResponse<CurrenciesResponse> = await axios.get(
        'https://v6.exchangerate-api.com/v6/e59c5033d86a308dd9f13177/latest/RUB',
      );
      if (response.status === 200) {
        const requiredCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];
        const filteredRates = requiredCurrencies.map((currency) => ({
          currency,
          rate: response.data.conversion_rates[currency],
        }));
        setСurrencies(filteredRates);
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

  return (
    <div>
      <h1>Конвертер валют</h1>
      <ul>
        {currencies.map((item) => (
          <li key={item.currency}>
            {item.currency}: {item.rate}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConverterPage;
