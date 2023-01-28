import { ObjectType, Field, Int } from "type-graphql";

export type GenderType = 'male' | 'female';

export type MemberRoleParty =
  'No Party Data'     // for error handling
  | 'Democrat'
  | 'Republican'
  | 'Populist'
  | 'Unionist'
  | 'Whig'
  | 'Jackson'
  | 'Federalist'
  | 'Ind. Republican-Democrat'
  | 'Nullifier'
  | 'Independent'
  | 'Liberal Republican'
  | 'Adams'
  | 'Popular Democrat'
  | 'Ind. Democrat'
  | 'Pro-Administration'
  | 'Anti-Lecompton Democrat'
  | 'Jacksonian'
  | 'Anti-Jacksonian'
  | 'Unconditional Unionist'
  | 'Anti-Administration'
  | 'Law and Order'
  | 'Adams Democrat'
  | 'National Greenbacker'
  | 'American'
  | 'New Progressive'
  | 'Anti Masonic'
  | 'Democratic Republican'
  | 'Silver Republican'
  | 'Progressive'
  | 'Free Silver'
  | 'Anti Jacksonian'
  | 'Ind. Republican'
  | 'Free Soil'
  | 'Nonpartisan'
  | 'Republican-Conservative'
  | 'Readjuster'
  | 'States Rights'
  | 'Conservative Republican'
  | 'Union Labor'
  | 'Ind. Whig'
  | 'Unknown'
  | 'Readjuster Democrat'
  | 'American Labor'
  | 'Conservative'
  | 'Coalitionist'
  | 'Crawford Republican'
  | 'Farmer-Labor'
  | 'Liberal'
  | 'AL'
  | 'Union'
  | 'Anti Jackson'
  | 'Liberty'
  | 'Union Democrat'
  | 'Anti Mason'
  | 'Anti-administration'
  | 'Pro-administration'
  | 'Democratic and Union Labor'
  | 'Prohibitionist'
  | 'Constitutional Unionist'
  | 'Socialist'
  | 'Silver'
  | 'Jackson Republican'
  | 'Independent Democrat'
  | 'Jacksonian Republican'
  | 'Progressive Republican'
  | 'Democrat-Liberal';

export type State = 'ID' | 'VA' | 'IN' | 'SD' | 'ME' | 'NV' | 'AK' |
  'WV' | 'IA' | 'SC' | 'WA' | 'NH' | 'OK' | 'LA' | 'NY' | 'ND' | 'NJ' | 'MO' | 'KS' |
  'CT' | 'RI' | 'UT' | 'WY' | 'OR' | 'AL' | 'MN' | 'NE' | 'TX' | 'NC' | 'CA' | 'OH' |
  'KY' | 'MT' | 'CO' | 'MA' | 'MD' | 'AZ' | 'VT' | 'NM' | 'PA' | 'DE' | 'TN' | 'WI' |
  'MS' | 'GA' | 'AR' | 'FL' | 'HI' | 'MI' | 'IL';

export type Territory = 'MP' | 'GU' | 'AS' | 'VI' | 'PI' | 'DK';

export type Region = 'PI' | 'DK';

// Outter Member data => data from old database or editted by editors
// Inner Member data (propublica / unitedstates) => data queried from other sources

@ObjectType()
export class Member {
  constructor(id: string) {
    this.id = id;
  }

  @Field()
  id!: string; // bioGuideId
  id_alias?: string;  // alias ID for the case that a member's ID is changed [Manually update]

  // basic info
  @Field({ nullable: true })
  firstName?: string;
  middleName?: string;
  @Field({ nullable: true })
  lastName?: string;
  nameSuffix?: string;
  @Field({ nullable: true })
  nickname?: string;
  @Field({ nullable: true })
  firstName_zh?: string;
  @Field({ nullable: true })
  lastName_zh?: string;
  @Field({ nullable: true })
  gender?: GenderType;
  @Field({ nullable: true })
  birthday?: string; // e.g., '1960-05-10'

  // affiliations
  @Field({ nullable: true })
  website?: string;
  @Field({ nullable: true })
  office?: string;
  @Field({ nullable: true })
  phone?: string;

  // external & social IDs
  @Field({ nullable: true })
  cspanId?: string;     // C-SPAN congress TV channel ID
  @Field({ nullable: true })
  twitterId?: string;   // e.g., 'RepJohnCurtis'
  @Field({ nullable: true })
  facebookId?: string;  // e.g., 'CongressmanRalphAbraham'
  @Field({ nullable: true })
  youtubeId?: string;

  // pic
  @Field({ nullable: true })
  profilePictureUri?: string; // should be a uri to our service
  getPictureFailCount?: number;

  // roles
  @Field(() => [MemberRole])
  congressRoles?: Array<MemberRole>;

  // used for Members queried from the sources
  updateTimestamp?: number;
  failCount?: number;

  bioguideMember?: Member;
  propublicaMember?: Member;
  unitedstatesMember?: Member;

  // for filtering out the data user want to delete (but may exist in ext. sources)
  revokedFields?: Array<keyof Member>
}

@ObjectType()
export class MemberRole {
  @Field(() => [Int])
  congressNumbers!: Array<number>;
  @Field()
  chamber!: 's' | 'h';
  @Field()
  startDate!: string;     // 0000-00-00 for invalid data
  @Field()
  endDate!: string;
  party?: MemberRoleParty;  // phased out
  @Field(() => [PartyRecord])
  parties!: Array<PartyRecord>;
  @Field()
  state!: State | Territory | Region;

  // house only
  @Field(() => Int, { nullable: true })
  district?: number;

  // senator only
  @Field(() => Int, { nullable: true })
  senatorClass?: number;
}

@ObjectType()
export class PartyRecord {
  @Field()
  party!: MemberRoleParty;
  @Field()
  startDate!: string;
  @Field()
  endDate!: string;
}
