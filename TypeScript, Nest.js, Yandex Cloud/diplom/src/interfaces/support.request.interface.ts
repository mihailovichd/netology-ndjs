import { SupportRequest } from '../schemas/support.request.schema';
import { Message } from '../schemas/message.schema';
import { GetChatListParams, MarkMessagesAsReadDto } from './message.interface';
import { SendMessageDto } from './dto/message.dto';
import { CreateSupportRequestDto } from './dto/support.request.dto';

export interface ISupportRequestService {
  findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: string): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}

export interface ISupportRequestClientService {
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: string): Promise<number>;
}

export interface ISupportRequestEmployeeService {
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: string): Promise<number>;
  closeRequest(supportRequest: string): Promise<void>;
}
