import { ObjectType, Field, Int } from "type-graphql";
import { Ii18NText } from "./i18n.interface";

export type BillType = 'hr' | 's' | 'sconres' | 'hres' | 'sres' | 'sjres' | 'hconres' | 'hjres';
export type BillTrackerStatus = 'intro' | 'house' | 'senate' | 'president' | 'law';
export type ChamberType = 'senate' | 'house';
export type TextVersionCode = 'unknown' | 'rcs' | 'res' | 'rdh' | 'ips' | 'eph' | 'enr' | 'rts' | 'cds' | 'sc' | 'ath' | 'renr' | 'reah' | 'rfs' | 'fph' | 'hds' | 'rds' | 'cdh' | 'pl' | 'cph' | 'as' | 'eh' | 'rs' | 'cps' | 'ris' | 'lth' | 'ash' | 'rih' | 'sas' | 'is' | 'hdh' | 'pp' | 'pav' | 'rch' | 'rfh' | 'eah' | 'lts' | 'pwh' | 'es' | 'fah' | 'ops' | 'rh' | 'pcs' | 'ats' | 'iph' | 'rah' | 'pap' | 'ras' | 'fps' | 'ih' | 'rth' | 'eas' | 'oph' | 'pch';

export class BillTracker {
  stepName!: string;
  isCurrent!: boolean;
}

export class BillAction {
  description!: string;
  datetime!: number;
  chamber?: ChamberType;
}

export class TextVersion {
  code!: TextVersionCode;
  date?: number;
  documents?: Array<TextDocument>;
}

export class TextDocument {
  // TODO: used to be S3 document
}

// TODO: graphql fields
@ObjectType()
export class Bill {
  constructor(congress: number, billType: BillType, billNumber: number) {
    this.congress = congress;
    this.billType = billType;
    this.billNumber = billNumber;
  }

  // Primary keys

  @Field()
  congress!: number;
  @Field()
  billType!: BillType;
  @Field()
  billNumber!: number;

  title?: Ii18NText;

  // Taiwan Watch fields
  summary?: Ii18NText;

  @Field({ nullable: true })
  relevance?: number;

  @Field({ nullable: true })
  introducedDate?: number;

  trackers!: Array<BillTracker>;

  // TODO: s3entity

  // full text
  versions!: Array<TextVersion>;
  actions!: Array<BillAction>;
  actionsAll!: Array<BillAction>;

  // TODO:
  // sponsor?
  // cosponsors
}
