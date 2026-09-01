import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SocialLink } from './social-link.model';
import { Skill } from './skill.model';
import { Experience } from './experience.model';
import { Project } from './project.model';

@ObjectType({ description: 'Цифровая визитка' })
export class Profile {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => [SocialLink])
  links?: SocialLink[];

  @Field(() => [Skill])
  skills?: Skill[];

  @Field(() => [Experience])
  experience?: Experience[];

  @Field(() => [Project])
  projects?: Project[];
}
