import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchGallery } from './actions/galleryActions';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  // вызываем action для подгрузки фото из базы (1 раз)
	useEffect(() => {
		dispatch(fetchGallery());
	}, [dispatch]);
	return (
		<>
			<div className="App">
				<h1 className="main__title">Test APP</h1>
				<Gallery />
			</div>
			<Footer />
		</>
	);
};

export default App;
