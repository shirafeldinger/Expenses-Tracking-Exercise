import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {WELCOME_SCREEN} from '../constants/navigation';
import {resetState} from '../redux/slices/useSlice';

const useSignOut = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const signOut = async () => {
    try {
      await AsyncStorage.clear();

      dispatch(resetState());

      navigation.reset({
        index: 0,
        routes: [{name: WELCOME_SCREEN}],
      });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return signOut;
};

export default useSignOut;
