import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Keyboard} from 'react-native';
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
    dispatch(setUser({email: values.email, token: '@TOKEN'}));

    setTimeout(() => {
      setSubmitting(false);
      navigation.replace('TabRouter');
    }, 5000);
  };

  const goToSignUp = () => {
    Keyboard.dismiss();
    navigation.push('SignUp');
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('signIn.inputEmail.error') || '')
      .required(t('signIn.inputEmail.required') || ''),
    pass: Yup.string().required(t('signIn.inputPass.required') || ''),
  });

  return {
    SignInSchema,
    submit,
    goToSignUp,
    initialValues,
  };
}
