import { useState } from 'react';

import {
  getPasswordStrength,
  PasswordStrength,
} from '@/utils/getPasswordStrength';

type UsePasswordInput = [
  password: string,
  error: string | undefined,
  validatePassword: (text: string) => void,
  handlePasswordInputChange: (text: string) => void,
];

const usePasswordInput = (): UsePasswordInput => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  const validatePassword = (text: string) => {
    const passwordStrength = getPasswordStrength(text);

    if (passwordStrength.value === PasswordStrength.TOO_WEAK) {
      setError(
        'Password is too weak. Use a mix of lowercase, uppercase, numbers and symbols.',
      );
    } else {
      setError(undefined);
    }
  };

  const handlePasswordInputChange = (text: string) => {
    validatePassword(text);
    setPassword(text);
  };

  return [password, error, validatePassword, handlePasswordInputChange];
};

export default usePasswordInput;
