import { Controller, Get, Body, Post, UseInterceptors } from '@nestjs/common';
import { SettingService } from './setting.service';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('api/setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  find() {
    return this.settingService.find();
  }

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  update(@Body() updateSettingDto: UpdateSettingDto) {
    return this.settingService.update(updateSettingDto);
  }
}
