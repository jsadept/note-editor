export interface INote{
    id?: string | null;
    title: string;
    createDate: Date;
    lastTimeEdit?: Date;
    shortDescription?: string;
    content?: any;
}