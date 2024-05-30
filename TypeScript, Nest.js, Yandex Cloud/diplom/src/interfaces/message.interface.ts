export interface MarkMessagesAsReadDto {
  user: string;
  supportRequest: string;
  createdBefore: Date;
}

export interface GetChatListParams {
  user: string | null;
  isActive: boolean;
}
