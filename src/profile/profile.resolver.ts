import { Info, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { requestedProfileRelations } from '../common/graphql/requested-relations';
import { ProfileService } from './profile.service';
import { Profile } from './graphql/models/profile.model';
import { Skill } from './graphql/models/skill.model';
import { Experience } from './graphql/models/experience.model';
import { Project } from './graphql/models/project.model';
import { SocialLink } from './graphql/models/social-link.model';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, {
    description: 'Профиль специалиста со связанными данными',
  })
  profile(@Info() info: GraphQLResolveInfo): Promise<Profile> {
    return this.profileService.getProfile(requestedProfileRelations(info));
  }

  @ResolveField(() => [SocialLink])
  links(@Parent() profile: Profile): Promise<SocialLink[]> | SocialLink[] {
    if (profile.links !== undefined) {
      return profile.links;
    }

    return this.profileService.getLinks(profile.id);
  }

  @ResolveField(() => [Skill])
  skills(@Parent() profile: Profile): Promise<Skill[]> | Skill[] {
    if (profile.skills !== undefined) {
      return profile.skills;
    }

    return this.profileService.getSkills(profile.id);
  }

  @ResolveField(() => [Experience])
  experience(
    @Parent() profile: Profile,
  ): Promise<Experience[]> | Experience[] {
    if (profile.experience !== undefined) {
      return profile.experience;
    }

    return this.profileService.getExperience(profile.id);
  }

  @ResolveField(() => [Project])
  projects(@Parent() profile: Profile): Promise<Project[]> | Project[] {
    if (profile.projects !== undefined) {
      return profile.projects;
    }

    return this.profileService.getProjects(profile.id);
  }
}
