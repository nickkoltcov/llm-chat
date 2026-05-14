export interface IMessage {
  id: number | string;
  role: 'user' | 'assistant';
  name: string;
  time: string;
  avatar: string;
  text: string;
}

export interface IChat {
  id: string;
  title: string;
  messages: IMessage[];
}