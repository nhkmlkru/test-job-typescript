import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileRelation } from '../common/graphql/requested-relations';

export type ProfileInclude = Partial<Record<ProfileRelation, boolean>>;

const ordered = { orderBy: { sortOrder: 'asc' as const } };

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async exists(): Promise<boolean> {
    const profile = await this.prisma.profile.findFirst({
      select: { id: true },
    });
    return profile !== null;
  }

  findFirst(include: ProfileInclude = {}) {
    return this.prisma.profile.findFirst({
      include: {
        links: include.links ? ordered : false,
        skills: include.skills ? ordered : false,
        experience: include.experience ? ordered : false,
        projects: include.projects ? ordered : false,
      },
    });
  }

  findSkills(profileId: string) {
    return this.prisma.skill.findMany({
      where: { profileId },
      ...ordered,
    });
  }

  findExperience(profileId: string) {
    return this.prisma.experience.findMany({
      where: { profileId },
      ...ordered,
    });
  }

  findProjects(profileId: string) {
    return this.prisma.project.findMany({
      where: { profileId },
      ...ordered,
    });
  }

  findLinks(profileId: string) {
    return this.prisma.socialLink.findMany({
      where: { profileId },
      ...ordered,
    });
  }

  create(data: Prisma.ProfileCreateInput) {
    return this.prisma.profile.create({ data });
  }
}
