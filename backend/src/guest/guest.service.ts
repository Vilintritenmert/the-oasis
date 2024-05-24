import { Injectable } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guest } from './entities/guest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private repository: Repository<Guest>,
  ) {}

  create(createGuestDto: CreateGuestDto) {
    return 'This action adds a new guest';
  }

  findAll(): Promise<Guest[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Guest | null> {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateGuestDto: UpdateGuestDto) {
    return `This action updates a #${id} guest`;
  }

  remove(id: number) {
    return `This action removes a #${id} guest`;
  }
}
