import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useChatSession from './useChatSession';
import { chatService } from '@/shared/api/chatService';
import { mapApiMessageToClient, mapFilesToAttachments } from '../utils/chatMappers';
import { IMessage,IFileMeta } from '@/shared/type';

vi.mock('@/shared/api/chatService', () => ({
    chatService: {
        getChatMessages: vi.fn(),
        sendMessage: vi.fn(),
    },
}));

vi.mock('../utils/chatMappers', () => ({
    mapApiMessageToClient: vi.fn(),
    mapFilesToAttachments: vi.fn(),
}));

vi.mock('uuid', () => ({
    v4: vi.fn(() => 'test-uuid'),
}));



describe('useChatSession', () => {

    const createWrapper = () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false },
            },
        });

        return function Wrapper({ children }: PropsWithChildren) {
            return (
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            );
        };
    };

    const chatsid = 'chat-1'

    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(chatService.getChatMessages).mockResolvedValue({ data: [] } as any);
        vi.mocked(chatService.sendMessage).mockResolvedValue({} as any);
        vi.mocked(mapFilesToAttachments).mockReturnValue([]);
    });

    const setupHook = () => {
        const renderResult = renderHook(() => useChatSession(chatsid), {
            wrapper: createWrapper(),
        });
        return renderResult;
    };

    it('загружает историю сообщений по chatsid', async () => {

        const apiMessage = {
            id: 'api-message-1',
            role: 'user',
            content: 'Привет',
        };

        const clientMessage:IMessage = {
            id: 'client-message-1',
            role: 'user',
            text: 'Привет',
            files: [],
            status: 'ok',
            time: '12:00',
        };

        vi.mocked(chatService.getChatMessages).mockResolvedValue({ data: [apiMessage]} as any);

        vi.mocked(mapApiMessageToClient).mockReturnValue(clientMessage);

        const { result } = setupHook();

        await waitFor(() =>  expect(result.current.isLoading).toBe(false));

        expect(chatService.getChatMessages).toHaveBeenCalledWith(chatsid);
        expect(vi.mocked(mapApiMessageToClient).mock.calls[0][0]).toEqual(apiMessage);
        expect(result.current.messages).toEqual([clientMessage]);
    });

    it('Отправка сообщения', async () => {

        const { result } = setupHook();
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        result.current.onSendUserMessage('Привет')

        await waitFor(() => {
            expect(chatService.sendMessage).toHaveBeenCalledWith({
                chatId: chatsid,
                content: 'Привет',
                clientMessageId: 'test-uuid',
                attachments: [],
            });
        });
    })

    it('отправка сообщения с файлом', async () => {

        const files: IFileMeta[] = [
            {
                name: 'photo.png',
                size: 1024,
                type: 'image/png',
                base64: 'base64-test',
            },
        ];
        const attachments = [
            {
                name: 'photo.png',
                type: 'image/png',
                base64: 'base64-test',
            },
        ] as any;
    
        vi.mocked(mapFilesToAttachments).mockReturnValue(attachments);

        const { result } = setupHook()

        await waitFor(() => {expect(result.current.isLoading).toBe(false)});

        result.current.onSendUserMessage("Что на фото?", files);

        await waitFor(() => {
            expect(chatService.sendMessage).toHaveBeenCalledWith({
                chatId: chatsid,
                content: 'Что на фото?',
                clientMessageId: 'test-uuid',
                attachments,
            });
        });
        expect(mapFilesToAttachments).toHaveBeenCalledWith(files);
    
    })

    it('повторная отправка сообщения', async () => {

        const userMessage: IMessage = {
            id: 'user-message-1',
            role: 'user',
            text: 'Привет',
            status: 'ok',
            time: '12:00',
            files: [],
        };

        const aiMessage: IMessage = {
            id: 'assistant-message-1',
            role: 'assistant',
            text: 'Ошибка',
            status: 'failed',
            time: '12:01',
            files: [],
        };

        vi.mocked(chatService.getChatMessages).mockResolvedValue({
            data: [{ id: 'api-user-message-1' }, { id: 'api-ai-message-1' }],
        } as any);

        vi.mocked(mapApiMessageToClient).mockImplementation((apiMsg: any) => {
            if (apiMsg.id === 'api-user-message-1') return userMessage;
            return aiMessage;
        });

        const { result } = setupHook();

        await waitFor(() => expect(result.current.isLoading).toBe(false));
        expect(result.current.messages).toEqual([userMessage, aiMessage]);

        result.current.onRetryMessage(aiMessage.id);

        await waitFor(() => {
            expect(chatService.sendMessage).toHaveBeenCalledWith({
                chatId: chatsid,
                content: userMessage.text,
                clientMessageId: 'test-uuid',
                attachments: [],
            });
        });

        expect(mapFilesToAttachments).toHaveBeenCalledWith(userMessage.files);
    });
});
