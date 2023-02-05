import { ObjectType, Field, Int, InputType } from "type-graphql";
import { Auth0RoleName, Member } from ".";
import { I18NText, I18NTextInput } from "./i18n.interface";

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

export class TextVersion {
  code!: TextVersionCode;
  date!: string;
  name!: string;
  downloaded?: { [type: string]: boolean };
  id?: string;
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

// TODO: graphql fields
@ObjectType()
export class Bill {
  constructor(id: string) {
    if (!id) {
      return;
    }
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

  public static fromId(id: string): Bill {
    return new this(id);
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

  needsSync = true;
  manualSync?: boolean;

  fieldsLastSynced?: { [key: string]: number };
  lastSynced?: number;

  /**
   * Derived fields from other collections
   */

  @Field(() => Member, { nullable: true })
  sponsor?: Member;

  @Field(() => Int, { nullable: true })
  cosponsorsCount?: number;

  @Field(() => [Member], { nullable: true })
  cosponsors?: Member[];

  tags?: string[];

  @Field()
  isSyncing?: boolean;

  @Field(() => Int, { nullable: true })
  createdTime?: number;

  deleted = false;
}
