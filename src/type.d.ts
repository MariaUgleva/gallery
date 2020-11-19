// тип одной картинки
export type PictureType = {
	id: number;
	url: string;
};
export type ModalPictureType = {
	id: number;
	url: string;
	comments?: Array<Comment>;
};
export type Comment = {
	id: number;
	date: number;
	text: string;
};
export type CommentFetch = {
	id: number;
	name: string;
	comment: string;
}
