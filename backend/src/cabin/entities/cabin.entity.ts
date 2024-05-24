import { Booking } from 'src/booking/entities/booking.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cabin {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  name: string;

  @Column()
  maxCapacity: number;

  @Column()
  regularPrice: number;

  @Column()
  discount: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @OneToMany(() => Booking, (booking) => booking.cabin)
  bookings: Booking[];
}
