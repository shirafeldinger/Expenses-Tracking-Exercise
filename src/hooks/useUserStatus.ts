import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStatus = () => {
  const [userName, setUserName] = useState<string>('');
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const checkName = async () => {
      const name = await AsyncStorage.getItem('fullName');
      if (name) {
        setUserName(name);
      }
      setIsReady(true);
    };

    checkName();
  }, []);

  return {userName, isReady};
};
