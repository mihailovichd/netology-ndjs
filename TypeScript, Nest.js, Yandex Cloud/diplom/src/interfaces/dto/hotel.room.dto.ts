export interface CreateRoomDto {
  description: string;
  hotelId: string;
  isEnabled: boolean;
  images: Express.Multer.File[] | string[];
}
