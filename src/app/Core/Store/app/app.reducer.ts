import {AppState} from './app.state';
import {createReducer, on} from '@ngrx/store';
import {setAPIStatus} from './app.action';


export const initialState: AppState = {
  loading: false,
  apiStatus: '',
  apiResponseMessage: ''
}

export const appReducer = createReducer(
  initialState,
  on(setAPIStatus, (state, {apiStatus}) => {
    return apiStatus;
  })
)
