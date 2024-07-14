import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Taxi } from './entities/taxi.entity';
import { CreateTaxiDto } from './dto/create-taxi.dto';
import { UpdateTaxiDto } from './dto/update-taxi.dto'; // Importez le DTO de mise à jour
import { Repository } from 'typeorm'; // Importez Repository depuis TypeORM
import { TaxiRepository } from './taxi.repository'; // Vous pouvez supprimer cette ligne si vous n'utilisez pas explicitement le TaxiRepository

@Injectable()
export class TaxisService {
  constructor(
    @InjectRepository(Taxi)
    private taxiRepository: Repository<Taxi>, // Injectez le Repository de base de TypeORM pour Taxi
  ) {}

  async findAll(): Promise<Taxi[]> {
    return this.taxiRepository.find();
  }

  async create(createTaxiDto: CreateTaxiDto): Promise<Taxi> {
    const { marque, modele, immatriculation, anneeFabrication } = createTaxiDto;
    const newTaxi = this.taxiRepository.create({ marque, modele, immatriculation, anneeFabrication });
    return this.taxiRepository.save(newTaxi);
  }

  async findOne(id: number): Promise<Taxi> {
    const taxi = await this.taxiRepository.findOne({ where: { id } });
    if (!taxi) {
      throw new NotFoundException(`Taxi with ID ${id} not found`);
    }
    return taxi;
  }
  

  async update(id: number, updateTaxiDto: UpdateTaxiDto): Promise<Taxi> {
    const taxi = await this.taxiRepository.findOne({ where: { id } });
    if (!taxi) {
      throw new NotFoundException(`Taxi with ID ${id} not found`);
    }

    taxi.marque = updateTaxiDto.marque || taxi.marque;
    taxi.modele = updateTaxiDto.modele || taxi.modele;
    taxi.immatriculation = updateTaxiDto.immatriculation || taxi.immatriculation;
    taxi.anneeFabrication = updateTaxiDto.anneeFabrication || taxi.anneeFabrication;

    return this.taxiRepository.save(taxi);
  }

  async generateTaxiSheet(id: number): Promise<string> {
    const taxi = await this.taxiRepository.findOne({ where: { id } });
    if (!taxi) {
      throw new NotFoundException(`Taxi with ID ${id} not found`);
    }

    let taxiSheet = `Fiche Taxi\n\n`;
    taxiSheet += `Marque: ${taxi.marque}\n`;
    taxiSheet += `Modèle: ${taxi.modele}\n`;
    taxiSheet += `Immatriculation: ${taxi.immatriculation}\n`;
    taxiSheet += `Année de fabrication: ${taxi.anneeFabrication}\n`;

    // Ajoutez d'autres informations spécifiques à la fiche taxi si nécessaire

    return taxiSheet;
  }
}
