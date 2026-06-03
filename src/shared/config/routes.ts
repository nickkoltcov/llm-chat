type ChatParams = {
  chatId: string;
};

export const routes = {
  home: () => "/",
  login: () => "/loginpage",
  chat: (params: ChatParams) => `/chats/${params.chatId}`,
} as const;
