import { chatService } from "@/shared/api/chatService";
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {useCreateChat} from './usecreatechat'
import { routes } from "../config/routes";


const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter: vi.fn(() => ({
        push: mockPush,
    })),
}));

vi.mock('@/shared/api/chatService', () => ({
    chatService: {
        createChat: vi.fn(),
        sendMessage: vi.fn(),
    },
}));


vi.mock('uuid', () => ({
    v4: vi.fn(() => 'test-uuid'),
}));

describe('useCreateChat', () => {

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
        vi.resetAllMocks()
        vi.mocked(chatService.createChat).mockResolvedValue({ data: { id: 'new-chat-id' } } as any);
        vi.mocked(chatService.sendMessage).mockResolvedValue({} as any);
    });

    const setupHook = () => {
        const renderResult = renderHook(() => useCreateChat(), {
            wrapper: createWrapper(),
        });
        return renderResult;
    };
    
    it('Создания чата', async () => {

        const { result } = setupHook()

        result.current.mutate('Привет')

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(chatService.createChat).toHaveBeenCalledWith('Привет')
        expect(chatService.sendMessage).toHaveBeenCalledWith({
            chatId: 'new-chat-id',
            content: 'Привет',
            clientMessageId: 'test-uuid'
        })

        expect(mockPush).toHaveBeenCalledWith(routes.chat({ chatId: 'new-chat-id' }));
    })
    
})