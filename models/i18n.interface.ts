import { ObjectType, Field, Info, InputType, Ctx } from "type-graphql";
import { IApolloContext } from "../../src/@types/common.interface";

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

  // computed field
  @Field(type => String, { nullable: true })
  text(
    @Info() info: { variableValues?: any },
    @Ctx() ctx: IApolloContext,
  ): string {
    const lang: string = info.variableValues?.lang || ctx.language;
    let s = this.zh || this.en || "";
    if (lang) {
      switch (lang.toLowerCase().substring(0, 2)) {
        case "en":
          s = this.en ?? s;
          break;

        case "zh":
        default:
          s = this.zh ?? s;
      }
    }
    return s;
  }

  public static create(en?: string, zh?: string): I18NText {
    return new I18NText({ zh, en });
  }

  public constructor(txt?: Ii18NText) {
    this.zh = txt?.zh;
    this.en = txt?.en;
  }
}
