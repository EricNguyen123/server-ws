import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignDto } from 'src/dto/campaigns.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';
import { CampaignsEntity } from 'src/entities/campaigns.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(CampaignsEntity)
    private readonly campaignsRepository: Repository<CampaignsEntity>,
  ) {}

  async createItem(campaignDto: CampaignDto): Promise<CampaignsEntity> {
    const campaign = await this.campaignsRepository.save(campaignDto);
    return campaign;
  }

  async updateItem(
    id: string,
    campaignDto: CampaignDto,
  ): Promise<CampaignsEntity> {
    const campaign = await this.findOneById(id);
    if (!campaign) throw new NotFoundException('Campaign not found');

    Object.assign(campaign, campaignDto);

    const campaignUpdate = await this.campaignsRepository.save(campaign);
    return campaignUpdate;
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.campaignsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Campaign not found');
    }

    return {
      status: 200,
      message: 'Campaign deleted successfully',
    };
  }

  async findOneById(id: string): Promise<CampaignsEntity> {
    const campaign = await this.campaignsRepository.findOneOrFail({
      where: { id: id },
    });

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }

    return campaign;
  }

  async findAll(): Promise<CampaignsEntity[]> {
    const campaigns = await this.campaignsRepository.find();
    return campaigns;
  }
}
