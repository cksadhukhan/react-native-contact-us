import {View, Text, ScrollView, StyleSheet, useColorScheme} from 'react-native'
import React from 'react'
import {Formik} from 'formik'
import {Button, Input} from '@src/components'
import {Colors} from '@src/utils'
import {ValidationSchema} from '@src/validation'
import {FormValues} from '@src/types'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '@src/store'
import {sendMessage} from '@src/features/messageSlice'

const ContactUsScreen: React.FC = () => {
  const theme = useColorScheme()

  const isDarkMode = (): boolean => {
    return theme === 'dark'
  }

  const {isLoading, status} = useSelector((state: RootState) => state.message)

  const dispatch: AppDispatch = useDispatch()

  const onSubmit = async (values: FormValues) => {
    dispatch(sendMessage(values))
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode()
            ? Colors.backgroundDark
            : Colors.backgroundLight,
        },
      ]}>
      <Text
        style={[
          styles.heading,
          {
            color: isDarkMode() ? Colors.headingDark : Colors.headingLight,
          },
        ]}>
        Contact Us
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{name: '', mobile: '', email: '', message: ''}}
          validationSchema={ValidationSchema}
          onSubmit={values => onSubmit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            dirty,
          }) => (
            <>
              <Input
                value={values.name}
                label="Name"
                placeholder="Enter your name"
                onChangeValue={handleChange('name')}
                onBlur={handleBlur('name')}
                touched={touched.name}
                errorMessage={errors.name}
                autoComplete="name"
              />
              <Input
                value={values.mobile}
                label="Mobile"
                placeholder="Enter your mobile number"
                onChangeValue={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                touched={touched.mobile}
                errorMessage={errors.mobile}
                autoComplete="tel"
              />
              <Input
                value={values.email}
                label="Email"
                placeholder="Enter your email"
                onChangeValue={handleChange('email')}
                onBlur={handleBlur('email')}
                touched={touched.email}
                errorMessage={errors.email}
                autoComplete="email"
              />
              <Input
                multiline
                value={values.message}
                label="Message"
                placeholder="Enter your message"
                onChangeValue={handleChange('message')}
                onBlur={handleBlur('message')}
                touched={touched.message}
                errorMessage={errors.message}
              />
              <Button
                loading={isLoading}
                label="Submit"
                onPress={handleSubmit}
                disabled={!isValid && dirty}
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  )
}

export default ContactUsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '500',
    marginVertical: 14,
  },
})
