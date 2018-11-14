export interface Activity {
  id: number;
  name: string;
  location: string;
  begin_date: string;
  end_date: string;
  date_created: Date;
  description: string;
  max_participants: number;
  participants: number;
  visibility: boolean;
  author: string;
  image: string;
  is_current_user_subscribed: boolean;
  comments: number;
}
