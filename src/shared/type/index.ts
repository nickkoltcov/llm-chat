export interface IMessage {
  id: string;
  role: "user" | "assistant";
  status: "ok" | "pending" | "failed";
  text: string;
  time: string;
  files?: IFileMeta[];
}

export interface IFileMeta {
  name: string;
  size: number;
  type: string;
  base64: string;
}

export interface IMessageContentBlock {
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

//==========BACK============================

export interface IGetChatsResponse {
  data: IChat[];
  nextCursor: string | null;
}

export interface IChat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  lastMessagePreview: string | null;
  lastMessageAt: string | null;
  messageCount: number;
}

export interface ICreateChatResponse {
  data: IChat;
}

export interface IMessageAttachment {
  type: "image" | "file";
  mimeType: string;
  data: string;
}

export interface IMessageToApi {
  id: string;
  chatId: string;
  role: string;
  content: string;
  status: string;
  createdAt: string;
  attachments: IMessageAttachment[];
  llm?: {
    provider: string;
    model: string;
    requestId: string;
    usage: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
    };
  };
}

export interface IDataMessage {
  data: IMessageToApi[];
  nextCursor: string | null;
}

export interface ISendMessageResponse {
  data: {
    userMessage: IMessageToApi;
    assistantMessage: IMessageToApi;
  };
}

export type SendMessageAttachment =
  | {
      type: "image";
      mimeType: "image/jpeg" | "image/png" | "image/webp" | "image/gif";
      data: string;
    }
  | {
      type: "file";
      mimeType: "application/pdf";
      data: string;
    };

export interface IUser {
  id: string;
}

export interface IGetMeResponse {
  data: IUser;
}
