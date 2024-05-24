import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { And, Equal, LessThan, MoreThan, Or, Raw, Repository } from 'typeorm';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private repository: Repository<Booking>,
  ) {}

  create(createBookingDto: CreateBookingDto) {
    return 'This action adds a new booking';
  }

  findAll(): Promise<Booking[]> {
    return this.repository.find();
  }

  findAfterDate(date: string): Promise<Booking[]> {
    return this.repository.findBy({
      createdAt: And(
        MoreThan(date),
        Raw((alias) => `${alias} < NOW()`),
      ),
    });
  }

  findStaysAfterDate(date: string): Promise<Booking[]> {
    return this.repository.findBy({
      startDate: And(
        MoreThan(date),
        Raw((alias) => `${alias} < NOW()`),
      ),
    });
  }

  findStaysToday(): Promise<Booking[]> {
    return this.repository.findBy([
      {
        endDate: Raw((alias) => `${alias} = NOW()`),
        status: Or(Equal('checked-in'), Equal('unconfirmed')),
      },
      {
        startDate: Raw((alias) => `${alias} = NOW()`),
        status: Or(Equal('checked-in'), Equal('unconfirmed')),
      },
    ]);
  }

  findOne(id: number): Promise<Booking | null> {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return this.repository.update(
      {
        id: Equal(id),
      },
      updateBookingDto,
    );
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
