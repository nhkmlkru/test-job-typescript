import { Field, ObjectType } from '@nestjs/graphql';
import { SkillCategory } from './skill-category.enum';

@ObjectType({ description: 'Навык' })
export class Skill {
  @Field()
  name!: string;

  @Field(() => SkillCategory)
  category!: SkillCategory;
}
