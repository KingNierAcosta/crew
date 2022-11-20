import {createFeatureSelector} from '@ngrx/store';
import {AppState} from './app.state';


export const selectAppStage = createFeatureSelector<AppState>('AppStage');
