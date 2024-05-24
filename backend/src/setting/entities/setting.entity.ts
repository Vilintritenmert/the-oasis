import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  minBookingLength: number;

  @Column()
  maxBookingLength: number;

  @Column()
  maxGuestsPerBooking: number;

  @Column()
  breakfastPrice: number;
}
