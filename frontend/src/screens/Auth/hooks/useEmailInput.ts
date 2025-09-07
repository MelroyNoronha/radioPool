import { useState } from 'react';

import isValidEmail from '@/utils/isValidEmail';

type UseEmailInput = [
  email: string,
  error: string | undefined,
  validateEmail: (text: string) => void,
  handleEmailInputChange: (text: string) => void,
  handleEmailInputBlur: () => void,
];

const useEmailInput = (): UseEmailInput => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const validateEmail = (text: string) => {
    if (!isValidEmail(text)) {
      setError('Please enter a valid email');
    } else {
      setError(undefined);
    }
  };

  const handleEmailInputChange = (text: string) => {
    validateEmail(text);
    setEmail(text);
  };

  const handleEmailInputBlur = () => {
    validateEmail(email);
  };

  return [
    email,
    error,
    validateEmail,
    handleEmailInputChange,
    handleEmailInputBlur,
  ];
};

export default useEmailInput;
