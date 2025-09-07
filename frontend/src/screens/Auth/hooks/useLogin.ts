import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import supabase from '@/utils/supabaseClient';

type UseLogIn = [handleLogInPress: () => void, isLoading: boolean];

const useLogIn = (
  email: string,
  password: string,
  validateEmail: (text: string) => void,
  validatePassword: (text: string) => void,
  emailError: string | undefined,
  passwordError: string | undefined,
): UseLogIn => {
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useNavigation();

  const handleLogInPress = async () => {
    validateEmail(email);
    validatePassword(password);

    if (!emailError && !passwordError) {
      setIsLoading(true);

      const signInResponse = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'radiopool://auth/callback', // Use your deep link URL scheme
          data: {
            email_confirm_text:
              'Welcome to radioPool! Please confirm your email to continue.',
            email_confirm_html:
              '<h1>Welcome to radioPool!</h1><p>Please confirm your email address to start using our service.</p>',
          },
        },
      });

      setIsLoading(false);

      const { data, error } = signInResponse;

      if (error && error.message) {
        // error.message in a toast
      } else if (!data.session && data.user) {
        navigate('Home');
        // wait for email confirmation
      } else if (data.session && !data.user) {
        navigate('Home');
      }
      console.log(signInResponse);
    }
  };

  return [handleLogInPress, isLoading];
};

export default useLogIn;
