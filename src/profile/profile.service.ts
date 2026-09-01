import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRelation } from '../common/graphql/requested-relations';
import { ProfileMapper } from './mappers/profile.mapper';
import { ProfileInclude, ProfileRepository } from './profile.repository';
import { Profile } from './graphql/models/profile.model';
import { Skill } from './graphql/models/skill.model';
import { Experience } from './graphql/models/experience.model';
import { Project } from './graphql/models/project.model';
import { SocialLink } from './graphql/models/social-link.model';

const ALL_RELATIONS: ProfileRelation[] = [
  'links',
  'skills',
  'experience',
  'projects',
];

@Injectable()
export class ProfileService {
  constructor(private readonly profiles: ProfileRepository) {}

  async getProfile(relations: ProfileRelation[] = ALL_RELATIONS): Promise<Profile> {
    const include: ProfileInclude = {};
    for (const relation of relations) {
      include[relation] = true;
    }

    const record = await this.profiles.findFirst(include);

    if (!record) {
      throw new NotFoundException('Профиль ещё не заполнен');
    }

    return ProfileMapper.toProfile(record);
  }

  async getSkills(profileId: string): Promise<Skill[]> {
    const records = await this.profiles.findSkills(profileId);
    return records.map(ProfileMapper.toSkill);
  }

  async getExperience(profileId: string): Promise<Experience[]> {
    const records = await this.profiles.findExperience(profileId);
    return records.map(ProfileMapper.toExperience);
  }

  async getProjects(profileId: string): Promise<Project[]> {
    const records = await this.profiles.findProjects(profileId);
    return records.map(ProfileMapper.toProject);
  }

  async getLinks(profileId: string): Promise<SocialLink[]> {
    const records = await this.profiles.findLinks(profileId);
    return records.map(ProfileMapper.toSocialLink);
  }
}
