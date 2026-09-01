import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Проект' })
export class Project {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field({ nullable: true })
  url?: string;

  @Field({ nullable: true })
  repositoryUrl?: string;

  @Field(() => [String])
  technologies!: string[];
}
