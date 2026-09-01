import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Профессиональная ссылка' })
export class SocialLink {
  @Field()
  label!: string;

  @Field()
  url!: string;
}
