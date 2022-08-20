import { ObjectType, Field } from "type-graphql";
import { v4 as uuidv4 } from 'uuid';

export type ArticleStatus = 'Draft' | 'Publish';

/**
 * Article
 */
@ObjectType()
export class Article {
    constructor(title?: string, content?: string, status?: ArticleStatus, author?: string[], imageSource?: string, tags?: string[]) {
        this.id = uuidv4();
        this.title = title;
        this.content = content;
        this.status = status;
        this.author = author;
        this.imageSource = imageSource;
        this.tags = tags;
    }

    @Field(() => String, { nullable: false })
    id!: string;

    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    content?: string;

    @Field(() => String, { nullable: true })
    status?: ArticleStatus;

    @Field(() => [String], { nullable: true })
    author?: string[];

    @Field(() => String, { nullable: true })
    pusblishTime?: string;

    @Field(() => String, { nullable: true })
    imageSource?: string;

    @Field(() => [String], { nullable: true })
    tags?: string[];
}

