import { InputType, Field } from "type-graphql";

@InputType()
export class MemberFiltersInput {
  @Field(() => [String], { nullable: true })
  bioGuideIds?: string[];
  @Field({ nullable: true })
  congress?: number;
  @Field( { nullable: true })
  state?: string;
}