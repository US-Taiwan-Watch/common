import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Auth0RoleName, Member } from ".";
import { I18NText, I18NTextInput } from "./i18n.interface";
import { NotionPage } from "./notion-page.interface";

export type BillType =
  | "hr"
  | "s"
  | "sconres"
  | "hres"
  | "sres"
  | "sjres"
  | "hconres"
  | "hjres";
export type BillTrackerStatus =
  | "intro"
  | "house"
  | "senate"
  | "president"
  | "law";
export type ChamberType = "senate" | "house";
export type TextVersionCode =
  | "unknown"
  | "rcs"
  | "res"
  | "rdh"
  | "ips"
  | "eph"
  | "enr"
  | "rts"
  | "cds"
  | "sc"
  | "ath"
  | "renr"
  | "reah"
  | "rfs"
  | "fph"
  | "hds"
  | "rds"
  | "cdh"
  | "pl"
  | "cph"
  | "as"
  | "eh"
  | "rs"
  | "cps"
  | "ris"
  | "lth"
  | "ash"
  | "rih"
  | "sas"
  | "is"
  | "hdh"
  | "pp"
  | "pav"
  | "rch"
  | "rfh"
  | "eah"
  | "lts"
  | "pwh"
  | "es"
  | "fah"
  | "ops"
  | "rh"
  | "pcs"
  | "ats"
  | "iph"
  | "rah"
  | "pap"
  | "ras"
  | "fps"
  | "ih"
  | "rth"
  | "eas"
  | "oph"
  | "pch";

@ObjectType()
export class BillTracker {
  @Field()
  stepName!: string;
  @Field()
  selected!: boolean;
}

export class BillAction {
  description!: string;
  date!: string;
  chamber?: ChamberType;
}

@ObjectType({ isAbstract: true })
export class TextVersion {
  @Field()
  code!: TextVersionCode;
  @Field()
  date!: string;
  @Field()
  name!: string;
  downloaded?: { [type: string]: boolean };
  id?: string;
}

@ObjectType()
class TextVersionFiles {
  @Field({ nullable: true })
  pdf?: string;
  @Field({ nullable: true })
  xml?: string;
  @Field({ nullable: true })
  txt?: string;
}

@ObjectType()
export class TextVersionWithFiles extends TextVersion {
  @Field(() => TextVersionFiles, { nullable: true })
  files!: TextVersionFiles;
}

export class CosponsorInfo {
  date!: string;
  memberId!: string;
}

export const BILL_AUTHORIZED_ROLES = [
  Auth0RoleName.Admin,
  Auth0RoleName.Editor,
];
@InputType()
export class BillInput {
  @Field()
  congress!: number;
  @Field()
  billType!: BillType;
  @Field()
  billNumber!: number;

  @Field({ nullable: true })
  title?: I18NTextInput;
  @Field({ nullable: true })
  summary?: I18NTextInput;

  @Field(() => Int, { nullable: true })
  introducedDate?: number;
}

@InputType()
export class BillQueryInput {
  @Field(() => [String])
  keywords!: string[];
}

export enum BillSyncStatus {
  WRONG_FORMAT = "Wrong format",
  FAILED = "Failed",
  NOT_STARTED = "Not started",
  WILL_SYNC = "Will sync",
  MANUAL_SYNC = "Manual sync",
  DONE = "Done",
}

// TODO: graphql fields
@ObjectType()
export class Bill extends NotionPage {
  constructor(id: string) {
    super();
    this.id = id;
    const keys = id.split("-");
    this.congress = parseInt(keys[0]);
    this.billType = keys[1] as BillType;
    this.billNumber = parseInt(keys[2]);
  }

  public static fromKeys(
    congress: number,
    billType: BillType,
    billNumber: number,
  ): Bill {
    return new this(`${congress}-${billType}-${billNumber}`);
  }

  public static fromId(id: string) {
    if (!id) {
      return null;
    }
    const bill = new this(id);
    if (bill.congress && bill.billType && bill.billNumber) {
      return bill;
    }
    return null;
  }

  @Field()
  id!: string;
  // Primary keys

  @Field()
  congress!: number;
  @Field()
  billType!: BillType;
  @Field()
  billNumber!: number;

  @Field({ nullable: true })
  title?: I18NText;
  @Field({ nullable: true })
  summary?: I18NText;

  @Field({ nullable: true })
  introducedDate?: string;

  @Field(() => [BillTracker], { nullable: true })
  trackers?: BillTracker[];

  // TODO: s3entity

  // full text
  versions?: TextVersion[];
  actions?: BillAction[];
  actionsAll?: BillAction[];

  sponsorId?: string;
  cosponsorInfos?: CosponsorInfo[];

  fieldsLastSynced?: { [key: string]: number };
  lastSynced?: number;

  deleted = false;
  status = BillSyncStatus.NOT_STARTED;

  /**
   * Derived fields from other collections
   */

  tags?: string[];

  @Field(() => Int, { nullable: true })
  createdTime?: number;
}
