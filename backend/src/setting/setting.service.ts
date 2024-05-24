import { Injectable } from '@nestjs/common';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private repository: Repository<Setting>,
  ) {}

  find(): Promise<Setting> {
    return this.repository.findOneBy({});
  }

  update(updateSettingDto: UpdateSettingDto) {
    return this.repository.update(1, updateSettingDto);
  }
}
