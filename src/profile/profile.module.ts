import { Module } from '@nestjs/common';
import { ProfileResolver } from './profile.resolver';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './profile.repository';
import { ProfileSeeder } from './seed/profile.seeder';

@Module({
  providers: [
    ProfileResolver,
    ProfileService,
    ProfileRepository,
    ProfileSeeder,
  ],
})
export class ProfileModule {}
