import { Module } from '@nestjs/common';
import { CabinService } from './cabin.service';
import { CabinController } from './cabin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cabin } from './entities/cabin.entity';
import { FileService } from 'src/file-service';

@Module({
  imports: [TypeOrmModule.forFeature([Cabin])],
  controllers: [CabinController],
  providers: [CabinService, FileService],
})
export class CabinModule {}
