import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useChatsList from './useChatsList';
import { chatService } from '@/shared/api/chatService';

vi.mock('@/shared/api/chatService', () => ({
    chatService: { getChats: vi.fn() }
}))


describe('useChatsList', () => {

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


    beforeEach(() => {
        vi.resetAllMocks();
        vi.mocked(chatService.getChats).mockResolvedValue({ data: [], nextCursor: null } as any);
    });

    const setupHook = () => {
        const renderResult = renderHook(() => useChatsList(), {
            wrapper: createWrapper(),
        });
        return renderResult;
    };

    it('проверяем что чаты подгружаются в chatHistory', async () => {
        const mockChat = { id: 'chat-1', name: 'Чат с ИИ' };

        vi.mocked(chatService.getChats).mockResolvedValue({ data: [mockChat], nextCursor: null } as any);

        const { result } = setupHook();

        await waitFor(() => expect(result.current.isLoading).toBe(false))

        expect(result.current.chats).toEqual([mockChat])
        expect(chatService.getChats).toHaveBeenCalledWith({limit: 10, cursor: null})
    })

    it('загрузка следующей порции чатов при клике', async () => {
        vi.mocked(chatService.getChats).mockResolvedValue({ data: [], nextCursor: 'cursor-2' });

        const { result } = setupHook();

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        result.current.fetchNextPage()

        await waitFor(() => expect(chatService.getChats).toHaveBeenCalledWith({limit: 10, cursor: 'cursor-2'}))


    })
})