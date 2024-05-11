import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateUserDto } from '../interfaces/dto/user.create.dto';
import { User, UserDocument } from '../schemas/user.schema';

export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async create(data: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.UserModel(data);
    return newUser.save();
  }

  async findById(id: string): Promise<UserDocument | undefined> {
    return this.UserModel.findById(id);
  }

  async findOne(email: string): Promise<UserDocument | undefined> {
    return this.UserModel.findOne({ email: email });
  }
}
