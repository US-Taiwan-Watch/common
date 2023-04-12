import { I18NText } from "./i18n.interface";
import { NotionPage } from "./notion-page.interface";

export class Tag extends NotionPage {
  id!: string;
  name!: I18NText;
}
