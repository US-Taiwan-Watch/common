import { ObjectType, Field, registerEnumType, Authorized } from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { Auth0RoleName, I18NText, Ii18NText, NotionPage, User } from ".";

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
export class Article extends NotionPage {
  constructor(
    title?: I18NText,
    content?: string,
    slug?: string,
    preview?: I18NText,
    isPublished?: boolean,
    authors?: string[],
    imageSource?: string,
    tags?: string[],
    type: ArticleType = ArticleType.ARTICLE,
  ) {
    super();
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

  @Field(() => I18NText, { nullable: true })
  title?: I18NText;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  slug?: string;

  @Field(() => I18NText, { nullable: true })
  preview?: I18NText;

  @Field(() => Boolean, { nullable: true })
  isPublished?: boolean;

  authors?: string[];

  @Field(() => Number, { nullable: true })
  publishedTime?: number;

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
