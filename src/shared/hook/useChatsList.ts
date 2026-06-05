import { useInfiniteQuery } from "@tanstack/react-query";
import { chatService } from "@/shared/services/chatService"; 
import { IChat, IGetChatsResponse } from "@/shared/type/index";

export default function useChatsList() {
    return useInfiniteQuery({
        queryKey: ['chats'],
        queryFn: ({pageParam}) => chatService.getChats({limit: 10, cursor: pageParam}),
        initialPageParam: null,
        getNextPageParam: (lastPage:IGetChatsResponse) => lastPage.nextCursor
    })
}