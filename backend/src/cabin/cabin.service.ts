import { Injectable } from '@nestjs/common';
import { CreateCabinDto } from './dto/create-cabin.dto';
import { UpdateCabinDto } from './dto/update-cabin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cabin } from './entities/cabin.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CabinService {
  constructor(
    @InjectRepository(Cabin)
    private repository: Repository<Cabin>,
  ) {}

  create(createCabinDto: CreateCabinDto): Promise<Cabin> {
    return this.repository.save(createCabinDto);
  }

  findAll(): Promise<Cabin[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Cabin | null> {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateCabinDto: UpdateCabinDto) {
    return this.repository.update(id, updateCabinDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.repository.delete({ id });
  }
}
