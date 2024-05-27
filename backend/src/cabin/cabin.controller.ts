import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  UseInterceptors,
} from '@nestjs/common';
import { CabinService } from './cabin.service';
import { CreateCabinDto } from './dto/create-cabin.dto';
import { UpdateCabinDto } from './dto/update-cabin.dto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file-service';

const storage = diskStorage({
  destination: join(__dirname, '..', 'public/cabins'),
  filename: (req, file, cb) => {
    const extension = extname(file.originalname);
    const randomName = Buffer.from(Math.random().toString())
      .toString('base64')
      .substring(10, 15);
    cb(null, `${randomName}${extension}`);
  },
});

@Controller('api/cabin')
export class CabinController {
  constructor(
    private readonly cabinService: CabinService,
    private readonly fileService: FileService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage }))
  create(
    @Body() createCabinDto: CreateCabinDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image' })],
        fileIsRequired: false,
      }),
    )
    image?: Express.Multer.File,
  ) {
    return this.cabinService.create({
      ...createCabinDto,
      image: image ? `http://localhost:8001/cabins/${image.filename}` : '',
    });
  }

  @Get()
  findAll() {
    return this.cabinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.cabinService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async update(
    @Param('id') id: number,
    @Body() updateCabinDto: UpdateCabinDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image' })],
        fileIsRequired: false,
      }),
    )
    image?: Express.Multer.File,
  ) {
    const { image: oldImage } = await this.cabinService.findOne(id);
    if (image) {
      updateCabinDto['image'] =
        `http://localhost:8001/cabins/${image.filename}`;
    }

    const updatedCabin = this.cabinService.update(id, updateCabinDto);

    if (image) {
      await this.fileService.delete(oldImage);
    }

    return updatedCabin;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const { image } = await this.cabinService.findOne(id);
    const result = await this.cabinService.remove(id);

    if (image) {
      await this.fileService.delete(image);
    }

    return result;
  }
}
