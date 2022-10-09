import { ObjectType, Field, Info } from "type-graphql";

export interface Ii18NText {
  zh?: string;
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
  text(@Info() info: { variableValues?: any }): string {
    const lang: string = info.variableValues?.lang;
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
    const text = new I18NText();
    zh && (text.en = en);
    zh && (text.zh = zh);
    return text;
  }

  public constructor(txt?: Ii18NText) {
    this.zh = txt?.zh;
    this.en = txt?.en;
  }
}
