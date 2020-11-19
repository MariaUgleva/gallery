import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../reducers/reducer';
import {PictureType} from '../../type';
import Picture from '../Picture';
// компонент галереи
const Gallery: React.FC = () => {
	const gallery: Array<PictureType> = useSelector((state: AppState) => state.gallery);
	return (
		<div className="container">
			<div className="gallery">
				{gallery.map((item: PictureType) => (
					<Picture key={item.id} data={item} />
				))}
			</div>
		</div>
	);
};

export default Gallery;
