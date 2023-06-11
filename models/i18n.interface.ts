import { ObjectType, Field, InputType } from "type-graphql";

export interface Ii18NText {
  zh?: string;
  en?: string;
}

@InputType()
export class I18NTextInput implements Ii18NText {
  @Field(() => String, { nullable: true })
  zh?: string;

  @Field(() => String, { nullable: true })
  en?: string;
}

/**
 * I18NText
 */
@ObjectType()
export class I18NText implements Ii18NText {
  @Field(() => String, { nullable: true })
  zh?: string;

  @Field(() => String, { nullable: true })
  en?: string;

  text?: string;

  public constructor(txt?: Ii18NText) {
    this.zh = txt?.zh;
    this.en = txt?.en;
  }
}
