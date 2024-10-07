import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActiveStorageService } from './active-storage.service';
import { multerOptions } from 'src/config/multer/multer.config';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { ValidRoles } from 'src/common/enums/valid-roles.enum';
import { ActiveStorageUploadFileResDto } from 'src/dto/active-storage-upload-file-res.dto';
import { ActiveStorageUploadFileDto } from 'src/dto/active-storage-upload-file.dto';

@ApiBearerAuth()
@ApiTags('activeStorage')
@Controller('upload')
export class ActiveStorageController {
  constructor(private readonly activeStorageService: ActiveStorageService) {}

  @ApiResponse({
    status: 201,
    description: 'Post product successfully',
    type: ActiveStorageUploadFileResDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Not found',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to be uploaded',
        },
      },
    },
  })
  @Roles(ValidRoles.Admin, ValidRoles.Editor)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadItemFile(
    @Query() activeStorageUploadFileDto: ActiveStorageUploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const uploadedFile = await this.activeStorageService.uploadFile(
      file,
      activeStorageUploadFileDto.id,
      activeStorageUploadFileDto.key,
    );
    return {
      message: 'File uploaded successfully',
      fileUrl: this.activeStorageService.getUploadedFileUrl(
        uploadedFile.blob.key,
      ),
    };
  }
}
