import { ObjectType, Field, Authorized } from "type-graphql";
import { Auth0RoleName } from "./models.interface";

/**
 * User
 */
@ObjectType()
export class User {
  @Authorized<Auth0RoleName>([Auth0RoleName.Admin, Auth0RoleName.Editor])
  @Field(() => String, { nullable: false })
  id!: string;

  @Authorized<Auth0RoleName>([Auth0RoleName.Admin, Auth0RoleName.Editor])
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  nickname?: string;

  @Field(() => String, { nullable: true })
  picture?: string;
}
