import {Reducer} from 'redux';
import {GalleryActionTypes, GalleryActions} from '../actions/galleryActions';
import {PictureType} from '../type';
// reducer также для погрузки данных в стейт
const initialState: Array<PictureType> = [];
const galleryReducer : Reducer<Array<PictureType>, GalleryActions> = (state = initialState, action) => {
	switch (action.type) {
		case GalleryActionTypes.GALLERY_LOAD_SUCCESS:
			return [
                ...action.data
            ]
		default:
			return state;
	}
};

export default galleryReducer;