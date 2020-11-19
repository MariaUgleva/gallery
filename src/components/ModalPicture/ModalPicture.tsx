import React, { useState } from 'react';
import { ModalPictureType, CommentFetch } from '../../type';
// тип входных данных в компонент модального окна
type Picture = {
	data: ModalPictureType;
	onClick: (id: number, commentFetch: CommentFetch) => void;
	handleClose: () => void;
};
// компонент модального окна
const ModalPicture: React.FC<Picture> = ({ data, onClick, handleClose }) => {
	// преобразовываем даты из бд в объект Date из js (просто для удобства)
	const dates: Array<Date> = data.comments ? data.comments.map((item) => new Date(item.date)) : [];
	// преобразовываем объект даты в строку для отображения на страничке
	const dataToString: Array<string> = dates.map((item) => {
		let result = '';
		item.getDate() < 10 ? (result += '0' + item.getDate() + '.') : (result += item.getDate() + '.');
		item.getMonth() + 1 < 10
			? (result += '0' + (item.getMonth() + 1) + '.')
			: (result += item.getMonth() + 1 + '.');
		result += item.getFullYear();
		return result;
	});
	// состояние, содержащее данные из input
	const [commentData, setCommentData] = useState({ name: '', text: '' });
	// функция отслеживает input-ы, если пользователь вводит данные, они записываются в commentData
	const handleChange = (event: any): void => {
		setCommentData({
			...commentData,
			[event.target.name]: event.target.value,
		});
	};
	// функция отслеживает кнопку отправки комментария (modal__btn-send)
	const onSend = (e: any): void => {
		// если все поля заполнены, формируем объект для отправки
		if (commentData.name && commentData.text) {
			const commentToSend = {
				id: +data.id,
				commentFetch: {
					id: Math.round(Math.random() * 1000),
					name: commentData.name,
					comment: commentData.text,
				},
			};
			// отправляем объект в функцию, которая находится в компоненте выше и выполняет запрос
			onClick(commentToSend.id, commentToSend.commentFetch);
			// очищаем input-ы
			setCommentData({ name: '', text: '' });
		}
	};

	return (
		<div className="modal">
			<div onClick={handleClose} className="modal__btn-close" />
			<img src={data.url} className="modal__img small" alt="" />
			<div className="modal__content">
				<img src={data.url} className="modal__img" alt="" />
				<div className="modal__content-inner">
					<input
						id="name"
						type="text"
						className="modal__input-name"
						name="name"
						value={commentData.name}
						onChange={handleChange}
						placeholder="Ваше имя"
					/>
					<input
						id="text"
						type="text"
						className="modal__input-comment"
						name="text"
						value={commentData.text}
						onChange={handleChange}
						placeholder="Ваш комментарий"
					/>
					<button onClick={onSend} className="modal__btn-send">
						Оставить комментарий
					</button>
				</div>
			</div>
			<ul className="modal__comments">
				{data.comments?.length ? (
					data.comments?.map((item, index) => (
						<li id={item.id.toString()} className="modal__comments-item">
							<p className="modal__comments-date">{dataToString[index]}</p>
							<p className="modal__comments-text">{item.text}</p>
						</li>
					))
				) : (
					<li>
						<span className="modal__comments-text">No comments</span>
					</li>
				)}
			</ul>
			<div className="modal__content small">
				<img src={data.url} className="modal__img" alt="" />
				<div className="modal__content-inner">
					<input
						id="name"
						type="text"
						className="modal__input-name"
						name="name"
						value={commentData.name}
						onChange={handleChange}
						placeholder="Ваше имя"
					/>
					<input
						id="text"
						type="text"
						className="modal__input-comment"
						name="text"
						value={commentData.text}
						onChange={handleChange}
						placeholder="Ваш комментарий"
					/>
					<button onClick={onSend} className="modal__btn-send">
						Оставить комментарий
					</button>
				</div>
			</div>
		</div>
	);
};
export default ModalPicture;
