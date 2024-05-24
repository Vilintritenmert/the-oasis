import { Cabin } from 'src/cabin/entities/cabin.entity';
import { Guest } from 'src/guest/entities/guest.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  numNights: number;

  @Column()
  numQuests: number;

  @Column('decimal', { precision: 6, scale: 2 })
  cabinPrice: number;

  @Column('decimal', { precision: 6, scale: 2 })
  extrasPrice: number;

  @Column('decimal', { precision: 6, scale: 2 })
  totalPrice: number;

  @Column()
  status: string;

  @Column()
  hasBreakfast: boolean;

  @Column()
  isPaid: boolean;

  @Column()
  observations: string;

  @ManyToOne(() => Cabin, (cabin) => cabin.bookings, {
    eager: true,
  })
  cabin: Cabin;

  @ManyToOne(() => Guest, (Guest) => Guest.bookings, {
    eager: true,
  })
  guest: Guest;
}
