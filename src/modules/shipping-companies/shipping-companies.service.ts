import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteUserResDto } from 'src/dto/delete-user-res.dto';
import { DeleteUsersResDto } from 'src/dto/delete-users-res.dto';
import { GetAccountDto } from 'src/dto/get-account.dto';
import { PaginationDto } from 'src/dto/pagination.dto';
import { ShippingCompaniesResDto } from 'src/dto/shipping-companies-res.dto';
import { ShippingCompanyDto } from 'src/dto/shipping-company.dto';
import { ShippingCompaniesEntity } from 'src/entities/shipping-companies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShippingCompaniesService {
  constructor(
    @InjectRepository(ShippingCompaniesEntity)
    private readonly shippingCompaniesRepository: Repository<ShippingCompaniesEntity>,
  ) {}

  async create(createShippingCompanyDto: ShippingCompanyDto) {
    const company = await this.shippingCompaniesRepository.save(
      createShippingCompanyDto,
    );
    return company;
  }

  async updateShippingCompany(
    id: string,
    data: ShippingCompanyDto,
  ): Promise<ShippingCompaniesEntity> {
    const company = await this.findOneById(id);
    if (!company) throw new NotFoundException('Company not found');

    company.name = data.name;
    company.email = data.email;
    company.phone = data.phone;
    company.url = data.url;
    company.memo = data.memo;
    return company;
  }

  async deleteCompany(id: string): Promise<DeleteUserResDto> {
    const result = await this.shippingCompaniesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Company with ID "${id}" not found`);
    }
    return {
      id: id,
      status: 200,
      message: 'User deleted successfully',
    };
  }

  async deleteCompanies(data: GetAccountDto[]): Promise<DeleteUsersResDto> {
    const ids = data.map((item) => item.id);
    const result = await this.shippingCompaniesRepository.delete(ids);

    if (result.affected === 0) {
      throw new NotFoundException(`No companies found for the given IDs`);
    }

    return {
      ids: ids,
      status: 200,
      message: 'Users deleted successfully',
    };
  }

  async findOneById(id: string): Promise<ShippingCompaniesEntity> {
    try {
      return await this.shippingCompaniesRepository.findOneOrFail({
        where: { id },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  async findAllWithPagination(
    paginationDto: PaginationDto,
  ): Promise<ShippingCompaniesEntity[]> {
    const { offset, limit } = paginationDto;

    return await this.shippingCompaniesRepository.find({
      skip: offset,
      take: limit,
      select: [
        'id',
        'name',
        'email',
        'phone',
        'url',
        'memo',
        'createdDate',
        'updatedDate',
      ],
    });
  }

  async findAll(): Promise<ShippingCompaniesResDto[]> {
    return await this.shippingCompaniesRepository.find({
      select: [
        'id',
        'name',
        'email',
        'phone',
        'memo',
        'url',
        'createdDate',
        'updatedDate',
      ],
    });
  }

  async findOneByShippingCompany(id: string): Promise<ShippingCompaniesResDto> {
    try {
      const company = await this.shippingCompaniesRepository.findOneOrFail({
        where: { id },
      });
      return company;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException('Shipping company not found');
    }
  }
}
