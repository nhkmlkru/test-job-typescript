import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Место работы' })
export class Experience {
  @Field()
  company!: string;

  @Field({ nullable: true })
  companyUrl?: string;

  @Field()
  position!: string;

  @Field({ description: 'Начало периода, формат MM.YYYY' })
  startDate!: string;

  @Field({ nullable: true, description: 'Конец периода, формат MM.YYYY' })
  endDate?: string;

  @Field({ description: 'Человекочитаемый период работы' })
  period!: string;

  @Field()
  description!: string;

  @Field(() => [String])
  achievements!: string[];
}
