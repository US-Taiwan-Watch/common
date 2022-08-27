import { ObjectType, Field } from "type-graphql";
import { v4 as uuidv4 } from 'uuid';

export type ArticleStatus = 'Draft' | 'Publish';

/**
 * Article
 */
@ObjectType()
export class Article {
    constructor(title?: string, content?: string, slug?: string, preview?: string, isPublished?: boolean, authors?: string[], imageSource?: string, tags?: string[]) {
        this.id = uuidv4();
        this.title = title;
        this.content = content;
        this.slug = slug;
        this.preview = preview;
        this.isPublished = isPublished;
        this.authors = authors;
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
    slug?: string;

    @Field(() => String, { nullable: true })
    preview?: string;

    @Field(() => Boolean, { nullable: true })
    isPublished?: boolean;

    @Field(() => [String], { nullable: true })
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
}

