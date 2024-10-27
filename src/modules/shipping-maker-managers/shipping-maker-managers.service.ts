import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShippingMakerManagersEntity } from 'src/entities/shipping-maker-managers.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { ShippingInstructionsService } from '../shipping-instructions/shipping-instructions.service';
import { ShippingMakerManagersDto } from 'src/dto/shipping-maker-managers.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@Injectable()
export class ShippingMakerManagersService {
  constructor(
    private readonly shippingInstructionsService: ShippingInstructionsService,
    private readonly usersService: UserService,
    @InjectRepository(ShippingMakerManagersEntity)
    private readonly shippingMakerManagersRepository: Repository<ShippingMakerManagersEntity>,
  ) {}

  async createItem(
    shippingMakerManagersDto: ShippingMakerManagersDto,
  ): Promise<ShippingMakerManagersEntity> {
    const shippingInstruction =
      await this.shippingInstructionsService.findOneById(
        shippingMakerManagersDto.shipping_instruction_id,
      );
    const user = await this.usersService.findOneById(
      shippingMakerManagersDto.user_id,
    );
    if (!shippingInstruction || !user) {
      throw new NotFoundException('User or Shipping Instruction not found');
    }
    const shippingMakerManagers = this.shippingMakerManagersRepository.create({
      user,
      shippingInstruction,
    });
    return await this.shippingMakerManagersRepository.save(
      shippingMakerManagers,
    );
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.shippingMakerManagersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Shipping Maker Manager not found');
    }

    return {
      status: 200,
      message: 'Shipping Maker Manager deleted successfully',
    };
  }

  async findAllByShippingInstructionsId(
    id: string,
  ): Promise<ShippingMakerManagersEntity[]> {
    return this.shippingMakerManagersRepository.find({
      where: { shippingInstruction: { id } },
      relations: ['user', 'shippingInstruction'],
    });
  }

  async findAllByUserId(id: string): Promise<ShippingMakerManagersEntity[]> {
    return this.shippingMakerManagersRepository.find({
      where: { user: { id } },
      relations: ['user', 'shippingInstruction'],
    });
  }

  async findOneById(id: string): Promise<ShippingMakerManagersEntity> {
    return this.shippingMakerManagersRepository.findOneOrFail({
      where: { id },
      relations: ['user', 'shippingInstruction'],
    });
  }

  async findAll(): Promise<{
    [userId: string]: ShippingMakerManagersEntity[];
  }> {
    const records = await this.shippingMakerManagersRepository.find({
      relations: ['user', 'shippingInstruction'],
    });

    const groupedByUser = records.reduce(
      (acc, record) => {
        const userId = record.user.id;

        if (!acc[userId]) {
          acc[userId] = [];
        }
        acc[userId].push(record);

        return acc;
      },
      {} as { [userId: string]: ShippingMakerManagersEntity[] },
    );

    return groupedByUser;
  }
}
