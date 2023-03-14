import {useEffect} from 'react';
import {
  PERMISSIONS,
  request,
  requestNotifications,
} from 'react-native-permissions';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Alert, Keyboard} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as Yup from 'yup';

// Types
import type {MainNavigationProp} from '../../../routes/stack/types';

// Dispatch
import {useAppDispatch} from '../../../store/hooks';

// Actions
import {setUser} from '../../../store/user/userSlice';

export default function useSignIn() {
  const navigation = useNavigation<MainNavigationProp>();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const initialValues = {email: '', pass: ''};

  const submit = (
    values: typeof initialValues,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    Keyboard.dismiss();
    auth()
      .signInWithEmailAndPassword(values.email, values.pass)
      .then(() => {
        dispatch(setUser({email: values.email, token: '@TOKEN'}));
        navigation.replace('TabRouter');
      })
      .catch(() => {
        Alert.alert('Atenção', 'Usuário ou senha incorretos');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const goToSignUp = () => {
    navigation.push('SignUp');
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('signIn.inputEmail.error') || '')
      .required(t('signIn.inputEmail.required') || ''),
    pass: Yup.string().required(t('signIn.inputPass.required') || ''),
  });

  function requestPermissions() {
    requestNotifications(['alert', 'sound']).then(({status}) => {
      console.log(status);
    });
  }

  useEffect(() => {
    requestPermissions();
  }, []);

  return {
    SignInSchema,
    submit,
    goToSignUp,
    initialValues,
  };
}
