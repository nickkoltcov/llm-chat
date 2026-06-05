export interface IMessage {
  id: string;
  role: "user" | "assistant";
  status: "ok" | "pending" | "failed";
  text: string;
  name: string;
  time: string;
  avatar: string;
  files?: IFileMeta[];
  content?: string; 
  createdAt?: string; 
  attachments?: any[];
}
export interface IChat {
  id: string;
  title: string;
  messages: IMessage[];
  updatedAt?: string;
}


export interface IFileMeta {
  name: string;
  size: number;
  type: string;
  base64: string;
}

export interface MessageContentBlock {
  type: "text" | "image_url" | "file" | "video_url" | "input_audio";
  text?: string;
  name?: string;
  size?: string;
  url?: string;
  image_url?: {
    url: string;
    name?: string;
    size?: string;
  };
  file?: {
    filename: string;
    file_data: string;
  };
  input_audio?: {
    data: string;
    format: string;
  };
}


export interface IGetChatsResponse {
  data: IChat[];
  nextCursor: string | null;
}

export interface ICreateChatResponse {
  data: IChat;
}