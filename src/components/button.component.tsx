import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
  useColorScheme,
  StyleSheet,
} from 'react-native'
import React from 'react'
import {Colors} from '@src/utils'

interface ButtonComponentProps extends TouchableOpacityProps {
  color?: string
  textColor?: string
  label: string
  onPress: () => void
  loading?: boolean
}

const Button: React.FC<ButtonComponentProps> = (
  props: ButtonComponentProps,
) => {
  const theme = useColorScheme()

  const isDarkMode = (): boolean => {
    return theme === 'dark'
  }

  const {color, textColor, loading, label, onPress, disabled, ...rest} = props

  const buttonColor = disabled ? '#535c68' : color ?? '#0abde3'

  return (
    <View style={{marginVertical: 12}}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: buttonColor,
          },
        ]}
        onPress={onPress}
        disabled={disabled}
        {...rest}>
        {loading && <ActivityIndicator color={Colors.white} />}
        {!loading && (
          <Text
            style={[
              styles.buttonLabel,
              {
                color: textColor ?? Colors.white,
              },
            ]}>
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '500',
  },
})
