export interface Activity {
  id: number;
  name: string;
  description: string;
  location: string;
  due_date: Date;
  max_participants: number;
  visibility: boolean;
  author: string;
  image: string;
  date_created: Date;
}
