import {
  View,
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
  StyleSheet,
} from 'react-native'
import React from 'react'
import {Colors} from '@src/utils'

interface InputComponentProps extends TextInputProps {
  value: string
  onChangeValue: (value: string) => void
  label: string
  placeholder: string
  errorMessage?: string
  touched?: boolean
}

const Input: React.FC<InputComponentProps> = (props: InputComponentProps) => {
  const theme = useColorScheme()

  const isDarkMode = (): boolean => {
    return theme === 'dark'
  }

  const {
    label,
    value,
    onChangeValue,
    placeholder,
    errorMessage,
    touched,
    ...rest
  } = props

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {color: isDarkMode() ? Colors.textDark : Colors.textLight},
        ]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.textInput,
          {
            borderColor:
              errorMessage && touched
                ? Colors.danger
                : isDarkMode()
                ? Colors.borderDark
                : Colors.borderLight,
            color: isDarkMode() ? Colors.textDark : Colors.textLight,
          },
        ]}
        value={value}
        placeholder={placeholder}
        onChangeText={value => onChangeValue(value)}
        placeholderTextColor={
          isDarkMode() ? Colors.placeholderDark : Colors.placeholderLight
        }
        {...rest}
      />
      {errorMessage && touched && (
        <Text style={styles.errorText}>{errorMessage}</Text>
      )}
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {alignItems: 'flex-start', marginVertical: 8},
  label: {fontSize: 16, fontWeight: '500'},
  textInput: {
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 8,
  },
  errorText: {color: Colors.danger},
})
