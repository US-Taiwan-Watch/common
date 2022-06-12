import { ObjectType, Field, Int } from "type-graphql";
import { I18NText } from "./i18n.interface";

export type BillType = 'hr' | 's' | 'sconres' | 'hres' | 'sres' | 'sjres' | 'hconres' | 'hjres';
export type BillTrackerStatus = 'intro' | 'house' | 'senate' | 'president' | 'law';
export type ChamberType = 'senate' | 'house';
export type TextVersionCode = 'unknown' | 'rcs' | 'res' | 'rdh' | 'ips' | 'eph' | 'enr' | 'rts' | 'cds' | 'sc' | 'ath' | 'renr' | 'reah' | 'rfs' | 'fph' | 'hds' | 'rds' | 'cdh' | 'pl' | 'cph' | 'as' | 'eh' | 'rs' | 'cps' | 'ris' | 'lth' | 'ash' | 'rih' | 'sas' | 'is' | 'hdh' | 'pp' | 'pav' | 'rch' | 'rfh' | 'eah' | 'lts' | 'pwh' | 'es' | 'fah' | 'ops' | 'rh' | 'pcs' | 'ats' | 'iph' | 'rah' | 'pap' | 'ras' | 'fps' | 'ih' | 'rth' | 'eas' | 'oph' | 'pch';

export class BillTracker {
  stepName!: string;
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

// TODO: graphql fields
@ObjectType()
export class Bill {
  public static fromKeys(congress: number, billType: BillType, billNumber: number): Bill {
    return {
      congress: congress,
      billType: billType,
      billNumber: billNumber,
      id: `${congress}-${billType}-${billNumber}`,
      needsSync: true,
    }
  }

  public static fromId(id: string): Bill {
    const keys = id.split('-');
    return {
      congress: parseInt(keys[0]),
      billType: keys[1] as BillType,
      billNumber: parseInt(keys[2]),
      id: id,
      needsSync: true,
    }
  }

  id!: string;
  // Primary keys

  @Field()
  congress!: number;
  @Field()
  billType!: BillType;
  @Field()
  billNumber!: number;

  title?: I18NText;
  summary?: I18NText;

  @Field({ nullable: true })
  introducedDate?: string;

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
}
