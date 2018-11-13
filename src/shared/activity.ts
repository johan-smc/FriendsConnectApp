export interface Activity {
  id: number;
  name: string;
  description: string;
  location: string;
  due_date: Date;
  max_participants: number;
  participants: number;
  visibility: boolean;
  author: string;
  image: string;
  date_created: Date;
  is_current_user_subscribed: boolean;
}
