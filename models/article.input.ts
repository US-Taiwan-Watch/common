import { InputType, Field } from "type-graphql";
import { I18NText } from ".";
import { ArticleType } from "./article.interface";

@InputType()
export class ArticleInput {
  @Field({ nullable: true })
  title?: I18NText;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  preview?: string;

  @Field({ nullable: true })
  isPublished?: boolean;

  @Field(() => [String], { nullable: true })
  authorIds?: string[];

  @Field({ nullable: true })
  imageSource?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => ArticleType, { nullable: true })
  type?: ArticleType;
}
