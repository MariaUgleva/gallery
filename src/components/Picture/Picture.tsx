import React, { useState } from 'react';
import { PictureType, ModalPictureType, Comment, CommentFetch } from '../../type';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ModalPicture from '../ModalPicture';
// стили для модальног окна
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			border: 'none',
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[5],
			padding: '30px',
			border: '0px',
			minWidth: '619px',
			maxHeight: '500px',
			overflow: 'auto',
			outline: 'none',
		},
		'@media (max-width: 768px)': {
			paper: {
				minWidth: '0px',
				maxWidth: '400px',
			},
		},
		'@media (max-width: 425px)': {
			paper: {
				width: '100vw',
				maxWidth: '100vw',
				minHeight: '100vh',
				padding: '0px',
			},
		},
	})
);
// тип входных данны для отображения картинки
type Picture = {
	data: PictureType;
};
// компонент картинки
const Picture: React.FC<Picture> = ({ data }) => {
	const classes = useStyles();
	// open, отвечает за  состояние модального окна (открыто/закрыто)
	const [open, setOpen] = useState(false);
	// начальное состояние, если data не пришла (сделала просто, чтобы typescript не ругался, не очень хорошо пока его знаю, поэтому немного костыли)
	const initialState: ModalPictureType = { id: 0, url: '' };
	//modalinfo содержит информацию об 1 картинке, котрая нужна для открытия в модальном окне
	const [modalinfo, setModalInfo] = useState(initialState);
	// функция для получения доп. информации об открытой картинке и добавления ее в modalinfo
	const getComments = async () => {
		try {
			const result = await fetch(`https://boiling-refuge-66454.herokuapp.com/images/${data.id}`, {
				method: 'GET',
			});
			if (await result.ok) {
				const res: ModalPictureType = await result.json();
				setModalInfo(res);
			}
		} catch (error) {
			console.log(error);
		}
	};
	// функция для запроса на добавление комментария
	const postComment = async (id: number, commentFetch: CommentFetch) => {
		try {
			const result = await fetch(`https://boiling-refuge-66454.herokuapp.com/images/${id}/comments`, {
				method: 'POST',
				body: JSON.stringify(commentFetch),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (await result.ok) {
				const newModalInfo = JSON.parse(JSON.stringify(modalinfo));
				// если получили ок на добавление комментария, то добавляем его в newModalInfo для отображения
				newModalInfo.comments.push({ id: commentFetch.id, text: commentFetch.comment, date: new Date() });
				setModalInfo(newModalInfo);
			}
		} catch (error) {
			console.log(error);
		}
	};
	// открытие модального окна
	const handleOpen = () => {
		setOpen(true);
		if (modalinfo.id) {
			return;
		}
		getComments();
	};
	// закрытие модального окна
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<div className="picture" onClick={handleOpen} id={data.id.toString()}>
				<img src={data.url} alt="" className="picture__img" />
			</div>
			<div>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={open}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<Fade in={open}>
						<div className={classes.paper}>
							<ModalPicture data={modalinfo} onClick={postComment} handleClose={handleClose} />
						</div>
					</Fade>
				</Modal>
			</div>
		</>
	);
};
export default Picture;
