import { Booking } from 'src/booking/entities/booking.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  nationality: string;

  @Column()
  nationalID: string;

  @Column()
  countryFlag: string;

  @OneToMany(() => Booking, (booking) => booking.cabin)
  bookings: Booking[];
}
