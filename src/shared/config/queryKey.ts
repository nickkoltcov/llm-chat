export const chatQueryKeys = {
  all: ["chats"] as const,
  lists: () => [...chatQueryKeys.all, "list"] as const,
  list: (params: { limit: number; cursor: string | null }) =>
    [...chatQueryKeys.lists(), params] as const,
  items: () => [...chatQueryKeys.all, "item"] as const,
  item: (id: string) => [...chatQueryKeys.items(), id] as const,
  messages: (id: string) => [...chatQueryKeys.item(id), "messages"] as const,
} as const;
