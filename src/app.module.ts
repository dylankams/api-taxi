import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DriversModule } from './drivers/drivers.module';
import { TaxisModule } from './taxis/taxis.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { Driver } from './drivers/entities/driver.entity';
import { Taxi } from './taxis/entities/taxi.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'taxiapp',
      entities: [User, Role, Driver, Taxi],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    DriversModule,
    TaxisModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}