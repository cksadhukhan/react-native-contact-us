import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {Linking} from 'react-native'
import {FormValues} from '../types'

export interface MessageState {
  isLoading: boolean
  status: string
}

const initialState: MessageState = {
  isLoading: false,
  status: 'idle',
}

export const sendMessage = createAsyncThunk(
  'message/sendMessage',
  async (values: FormValues, {getState}) => {
    const {name, mobile, email, message} = values
    const subject = 'Contact Form Response'
    const body = `Name: ${name}\n Mobile Number: ${mobile}\n Email: ${email}\n Message: ${message}`

    try {
      Linking.openURL(
        `mailto:info@redpositive.in?subject=${subject}&body=${body}`,
      )
    } catch (error) {
      console.log(error)
    }
  },
)

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.isLoading = true
        state.status = 'loading'
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isLoading = false
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed'
        state.isLoading = false
      })
  },
})

export default messageSlice.reducer
