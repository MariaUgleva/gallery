// тип одной картинки
export type PictureType = {
	id: number;
	url: string;
};
// тип подробной информации с сервера для картинки
export type ModalPictureType = {
	id: number;
	url: string;
	comments?: Array<Comment>;
};
// тип комментария
export type Comment = {
	id: number;
	date: number;
	text: string;
};
// тип комментария для отправки на сервер
export type CommentFetch = {
	id: number;
	name: string;
	comment: string;
}
