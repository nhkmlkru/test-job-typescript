import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProfileRepository } from '../profile.repository';
import { PROFILE_SEED } from './profile.seed';

@Injectable()
export class ProfileSeeder implements OnModuleInit {
  private readonly logger = new Logger(ProfileSeeder.name);

  constructor(private readonly profiles: ProfileRepository) {}

  async onModuleInit(): Promise<void> {
    if (await this.profiles.exists()) {
      this.logger.log('Профиль уже есть в базе, сид пропущен');
      return;
    }

    const data: Prisma.ProfileCreateInput = {
      name: PROFILE_SEED.name,
      title: PROFILE_SEED.title,
      description: PROFILE_SEED.description,
      links: { create: [...PROFILE_SEED.links] },
      skills: { create: [...PROFILE_SEED.skills] },
      experience: { create: [...PROFILE_SEED.experience] },
      projects: { create: [...PROFILE_SEED.projects] },
    };

    await this.profiles.create(data);
    this.logger.log('База заполнена данными профиля');
  }
}
