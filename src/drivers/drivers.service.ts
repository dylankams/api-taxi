import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from './entities/driver.entity';
import { CreateDriverDto } from './dto/create-driver.dto';
import { DriverRepository } from './driver.repository';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: DriverRepository,
  ) {}

  async findAll(): Promise<Driver[]> {
    return this.driverRepository.find();
  }

  async create(createDriverDto: CreateDriverDto): Promise<Driver> {
    const driver = new Driver();
    driver.name = createDriverDto.name;
    driver.surname = createDriverDto.surname;
    driver.age = createDriverDto.age;
    driver.experience = createDriverDto.experience;
    driver.phoneNumber = createDriverDto.phoneNumber;
    driver.contractStartDate = createDriverDto.contractStartDate;
    driver.workingHoursStart = createDriverDto.workingHoursStart;
    driver.workingHoursEnd = createDriverDto.workingHoursEnd;
    driver.restDays = createDriverDto.restDays;
    driver.taxiId = createDriverDto.taxiId;

    return this.driverRepository.save(driver);
  }

  async findOne(id: number): Promise<Driver> {
    const driver = await this.driverRepository.findOne({ where: { id } });
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }

  async update(id: number, updateDriverDto: CreateDriverDto): Promise<Driver> {
    const driver = await this.driverRepository.findOne({ where: { id } });
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    driver.name = updateDriverDto.name;
    driver.surname = updateDriverDto.surname;
    driver.age = updateDriverDto.age;
    driver.experience = updateDriverDto.experience;
    driver.phoneNumber = updateDriverDto.phoneNumber;
    driver.contractStartDate = updateDriverDto.contractStartDate;
    driver.workingHoursStart = updateDriverDto.workingHoursStart;
    driver.workingHoursEnd = updateDriverDto.workingHoursEnd;
    driver.restDays = updateDriverDto.restDays;
    driver.taxiId = updateDriverDto.taxiId;

    return this.driverRepository.save(driver);
  }
}
