import { useInfiniteQuery } from "@tanstack/react-query";
import { chatService } from "@/shared/api/chatService";
import { chatQueryKeys } from "../config/queryKey";

const CHATS_PAGE_SIZE = 10;

export default function useChatsList() {
  const query = useInfiniteQuery({
    queryKey: chatQueryKeys.lists(),
    queryFn: ({ pageParam }) =>
      chatService.getChats({ limit: CHATS_PAGE_SIZE, cursor: pageParam }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const chats = query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    chats,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
