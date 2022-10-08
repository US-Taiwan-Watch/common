import { ObjectType, Field, registerEnumType, Authorized } from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { Auth0RoleName, User } from ".";

export type ArticleStatus = "Draft" | "Publish";

export enum ArticleType {
  ARTICLE = 1,
  POSTER = 2,
}

registerEnumType(ArticleType, {
  name: "ArticleType",
});


export const ARTICLE_AUTHORIZED_ROLES = [
  Auth0RoleName.Admin,
  Auth0RoleName.Editor,
];

/**
 * Article
 */
@ObjectType()
export class Article {
  constructor(
    title?: string,
    content?: string,
    slug?: string,
    preview?: string,
    isPublished?: boolean,
    authors?: string[],
    imageSource?: string,
    tags?: string[],
    type: ArticleType = ArticleType.ARTICLE,
  ) {
    this.id = uuidv4();
    this.title = title;
    this.content = content;
    this.slug = slug;
    this.preview = preview;
    this.isPublished = isPublished;
    this.authors = authors;
    this.imageSource = imageSource;
    this.tags = tags;
    this.type = type;
  }

  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field(() => String, { nullable: true })
  preview?: string;

  @Field(() => Boolean, { nullable: true })
  isPublished?: boolean;

  authors?: string[];

  @Field(() => Number, { nullable: true })
  pusblishTime?: number;

  @Field(() => Number, { nullable: true })
  createdTime?: number;

  @Field(() => Number, { nullable: true })
  lastModifiedTime?: number;

  @Field(() => String, { nullable: true })
  imageSource?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => ArticleType, { nullable: true })
  type?: ArticleType;

  deleted = false;

  /**
   * Derived fields from other collections
   */

  @Field(() => [User], { nullable: true })
  authorInfos?: User[];
}
