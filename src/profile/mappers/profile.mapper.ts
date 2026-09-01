import {
  Experience as PrismaExperience,
  Profile as PrismaProfile,
  Project as PrismaProject,
  Skill as PrismaSkill,
  SocialLink as PrismaSocialLink,
} from '@prisma/client';
import { formatMonthYear, formatPeriod } from '../../common/dates';
import { Experience } from '../graphql/models/experience.model';
import { Profile } from '../graphql/models/profile.model';
import { Project } from '../graphql/models/project.model';
import { Skill } from '../graphql/models/skill.model';
import { SkillCategory } from '../graphql/models/skill-category.enum';
import { SocialLink } from '../graphql/models/social-link.model';

export type ProfileRecord = PrismaProfile & {
  links?: PrismaSocialLink[];
  skills?: PrismaSkill[];
  experience?: PrismaExperience[];
  projects?: PrismaProject[];
};

export class ProfileMapper {
  static toProfile(record: ProfileRecord): Profile {
    const profile = new Profile();
    profile.id = record.id;
    profile.name = record.name;
    profile.title = record.title;
    profile.description = record.description;

    if (record.links) {
      profile.links = record.links.map(ProfileMapper.toSocialLink);
    }

    if (record.skills) {
      profile.skills = record.skills.map(ProfileMapper.toSkill);
    }

    if (record.experience) {
      profile.experience = record.experience.map(ProfileMapper.toExperience);
    }

    if (record.projects) {
      profile.projects = record.projects.map(ProfileMapper.toProject);
    }

    return profile;
  }

  static toSocialLink(record: PrismaSocialLink): SocialLink {
    const link = new SocialLink();
    link.label = record.label;
    link.url = record.url;
    return link;
  }

  static toSkill(record: PrismaSkill): Skill {
    const skill = new Skill();
    skill.name = record.name;
    skill.category = record.category as SkillCategory;
    return skill;
  }

  static toExperience(record: PrismaExperience): Experience {
    const experience = new Experience();
    experience.company = record.company;
    experience.companyUrl = record.companyUrl ?? undefined;
    experience.position = record.position;
    experience.startDate = formatMonthYear(record.startDate);
    experience.endDate = record.endDate
      ? formatMonthYear(record.endDate)
      : undefined;
    experience.period = formatPeriod(record.startDate, record.endDate);
    experience.description = record.description;
    experience.achievements = record.achievements;
    return experience;
  }

  static toProject(record: PrismaProject): Project {
    const project = new Project();
    project.name = record.name;
    project.description = record.description;
    project.url = record.url ?? undefined;
    project.repositoryUrl = record.repositoryUrl ?? undefined;
    project.technologies = record.technologies;
    return project;
  }
}
