import { combineReducers } from 'redux';
import galleryReducer from './galleryReducer';
import { PictureType } from '../type';

export type AppState = {
	gallery: Array<PictureType>;
};
const createRootReducer = combineReducers<AppState>({
	gallery: galleryReducer,
});

export default createRootReducer;
