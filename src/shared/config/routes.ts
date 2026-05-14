type ChatParams = {
    chatId: string;
};

export const routes = {
    home: () => '/',
    chat: (params: ChatParams) => `/chats/${params.chatId}`,
} as const;

