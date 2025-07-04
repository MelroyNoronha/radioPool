import { useEffect, useState } from 'react';

import supabaseClient from '@/utils/supabaseClient';

const useIsAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabaseClient.auth.getSession();

      if (error) {
        setIsAuthenticated(false);
      }

      if (data) {
        const { session } = data;

        if (session === null) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      }
    };

    checkSession();
  }, []);

  return isAuthenticated;
};

const useIsNotAuthenticated = () => {
  return !useIsAuthenticated();
};

export { useIsAuthenticated, useIsNotAuthenticated };
