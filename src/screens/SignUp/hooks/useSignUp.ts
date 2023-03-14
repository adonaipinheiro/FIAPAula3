import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';
import * as Yup from 'yup';

// Types
import type {MainNavigationProp} from '../../../routes/stack/types';

export default function useSignUp() {
  const navigation = useNavigation<MainNavigationProp>();

  const initialValues = {name: '', email: '', pass: '', confirmPass: ''};

  const submit = (
    {email, pass, name}: typeof initialValues,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(user => {
        firestore()
          .collection('Users')
          .doc(user.user.uid)
          .set({
            name,
            email,
          })
          .then(() => {
            navigation.replace('TabRouter');
          });
      })
      .catch(() => {
        Alert.alert('Atenção', 'Não foi possível concluir a operação');
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const goToSignIn = () => {
    navigation.replace('SignIn');
  };

  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required('Este campo é obrigatório'),
    email: Yup.string()
      .email('Por favor insira um e-mail válido')
      .required('Este campo é obrigatório'),
    pass: Yup.string()
      .required('Este campo é obrigatório')
      .min(8, 'A senha deve conter no mínimo 8 digitos'),
    confirmPass: Yup.string().oneOf(
      [Yup.ref('pass')],
      'As senhas não estão iguais',
    ),
  });

  return {
    SignUpSchema,
    submit,
    goToSignIn,
    initialValues,
  };
}
