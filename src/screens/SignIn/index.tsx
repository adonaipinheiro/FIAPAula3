import React from 'react';
import {View, Text} from 'react-native';
import {Formik} from 'formik';
import {useTranslation} from 'react-i18next';

// Components
import {Input, Button} from '../../components';

// Styles
import {styles} from './styles';

// Hooks
import useSignIn from './hooks/useSignIn';

export default function SignIn() {
  const {initialValues, SignInSchema, submit, goToSignUp} = useSignIn();
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('title')}</Text>
      <Text style={styles.subTitle}>{t('subTitle')}</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={(values, {setSubmitting}) => submit(values, setSubmitting)}>
        {({handleChange, handleSubmit, values, errors, isSubmitting}) => (
          <>
            <Input
              placeholder={t('signIn.inputEmail.text') || ''}
              value={values.email}
              onChangeText={handleChange('email')}
              error={errors.email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Input
              placeholder={t('signIn.inputPass.text') || ''}
              value={values.pass}
              secureTextEntry
              onChangeText={handleChange('pass')}
              error={errors.pass}
              autoCapitalize="none"
            />
            <Button
              type="secondary"
              disabled={isSubmitting}
              text={
                isSubmitting
                  ? t('signIn.loadingText')
                  : t('signIn.signInButton')
              }
              onPress={handleSubmit}
            />
            <Button
              type="primary"
              text={t('signIn.goToSignUpButton')}
              onPress={goToSignUp}
            />
          </>
        )}
      </Formik>
    </View>
  );
}
