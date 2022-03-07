import { ObjectType, Field } from "type-graphql";

/**
 * User
 */
@ObjectType()
export class User {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  email?: string;
}
