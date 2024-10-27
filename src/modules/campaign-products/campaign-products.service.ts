import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignProductsEntity } from 'src/entities/campaign-products.entity';
import { Repository } from 'typeorm';
import { CampaignsService } from '../campaigns/campaigns.service';
import { ProductsService } from '../products/products.service';
import { CampaignProductsDto } from 'src/dto/campaign-products.dto';
import { DeleteItemResDto } from 'src/dto/delete-item-res.dto';

@Injectable()
export class CampaignProductsService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly campaignsService: CampaignsService,
    @InjectRepository(CampaignProductsEntity)
    private readonly campaignProductsRepository: Repository<CampaignProductsEntity>,
  ) {}

  async createItem(
    campaignProductsDto: CampaignProductsDto,
  ): Promise<CampaignProductsEntity> {
    const campaign = await this.campaignsService.findOneById(
      campaignProductsDto.campaign_id,
    );
    if (!campaign) {
      throw new NotFoundException(
        `Campaign with ID "${campaignProductsDto.campaign_id}" not found.`,
      );
    }

    const product = await this.productsService.findOneByProduct(
      campaignProductsDto.product_id,
    );
    if (!product) {
      throw new NotFoundException(
        `Product with ID "${campaignProductsDto.product_id}" not found.`,
      );
    }

    const campaignProducts = new CampaignProductsEntity();
    campaignProducts.discount_value = campaignProductsDto.discount_value;
    campaignProducts.product_type = campaignProductsDto.product_type;
    campaignProducts.campaign = campaign;
    campaignProducts.product = product;

    return await this.campaignProductsRepository.save(campaignProducts);
  }

  async updateItem(
    id: string,
    campaignProductsDto: CampaignProductsDto,
  ): Promise<CampaignProductsEntity> {
    const campaignProducts = await this.findOneById(id);
    if (!campaignProducts) {
      throw new NotFoundException('Campaign Products not found');
    }

    campaignProducts.discount_value = campaignProductsDto.discount_value;
    campaignProducts.product_type = campaignProductsDto.product_type;

    return await this.campaignProductsRepository.save(campaignProducts);
  }

  async deleteItem(id: string): Promise<DeleteItemResDto> {
    const result = await this.campaignProductsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Campaign Products not found');
    }

    return {
      status: 200,
      message: 'Campaign Products deleted successfully',
    };
  }

  async findOneById(id: string): Promise<CampaignProductsEntity> {
    const campaignProducts =
      await this.campaignProductsRepository.findOneOrFail({
        where: { id: id },
        relations: ['campaign', 'product'],
      });
    if (!campaignProducts) {
      throw new NotFoundException('Campaign Products not found');
    }

    return campaignProducts;
  }

  async findByProductId(productId: string): Promise<CampaignProductsEntity[]> {
    const product = await this.productsService.findOneByProduct(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID "${productId}" not found.`);
    }

    const campaignProducts = await this.campaignProductsRepository.find({
      where: { product: { id: productId } },
      relations: ['campaign', 'product'],
    });

    return campaignProducts;
  }

  async findByCampaignId(
    campaignId: string,
  ): Promise<CampaignProductsEntity[]> {
    const campaign = await this.campaignsService.findOneById(campaignId);
    if (!campaign) {
      throw new NotFoundException(
        `Campaign with ID "${campaignId}" not found.`,
      );
    }

    const campaignProducts = await this.campaignProductsRepository.find({
      where: { campaign: { id: campaignId } },
      relations: ['campaign', 'product'],
    });

    return campaignProducts;
  }

  async findByProductIdAndCampaignId(
    campaignId: string,
    productId: string,
  ): Promise<CampaignProductsEntity> {
    const campaignProducts =
      await this.campaignProductsRepository.findOneOrFail({
        where: { campaign: { id: campaignId }, product: { id: productId } },
        relations: ['campaign', 'product'],
      });

    return campaignProducts;
  }
}
