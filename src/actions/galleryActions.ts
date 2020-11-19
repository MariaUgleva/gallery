import { ActionCreator, Dispatch } from 'redux';
import { PictureType } from '../type';
// сделала action для подгрузки данных из базы в стэйт, поняла, что в данном приложении это можно не делать, но оставила
export enum GalleryActionTypes {
	GALLERY_LOAD_SUCCESS = 'GALLERY_LOAD_SUCCESS',
}

export type galleryLoadSuccessAction = {
	type: GalleryActionTypes.GALLERY_LOAD_SUCCESS;
	data: Array<PictureType>;
};

export type GalleryActions = galleryLoadSuccessAction;

export const addGalleryToRedux: ActionCreator<galleryLoadSuccessAction> = (data: Array<PictureType>) => ({
	type: GalleryActionTypes.GALLERY_LOAD_SUCCESS,
	data: data,
});


export const fetchGallery = () => {
	return async (dispatch: Dispatch) => {
		try {
			const result = await fetch('https://boiling-refuge-66454.herokuapp.com/images', {
				method: 'GET',
			});
			if (await result.ok) {
				dispatch(addGalleryToRedux([...await result.json()]));
			}
		} catch (error) {
            console.log(error);
		}
	};
};
