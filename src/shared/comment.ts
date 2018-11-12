export interface Comment {
    id: number;
    description: string;
    date_created: Date;
    user: number;
    replies: [Comment];
}