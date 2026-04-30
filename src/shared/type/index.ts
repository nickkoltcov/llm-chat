export interface IMessage {
  id: number | string;
  role: 'user' | 'assistant';
  name: string;
  time: string;
  avatar: string;
  text: string;
}