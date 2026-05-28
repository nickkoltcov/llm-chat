export interface IMessage {
  id: string;
  role: "user" | "assistant";
  name: string;
  time: string;
  avatar: string;
  text: string | any[];
}

export interface IChat {
  id: string;
  title: string;
  messages: IMessage[];
  updatedAt?: string;
}
