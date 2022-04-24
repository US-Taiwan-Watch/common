import { ObjectType, Field, Int } from "type-graphql";

export type LegislatorRoleParty =
  'Democrat'
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

@ObjectType()
export class Legislator {
  constructor(bioGuideId: string) {
    this.bioGuideId = bioGuideId;
  }

  @Field()
  bioGuideId!: string; // Primary key

  // basic info
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  middleName?: string;
  nameSuffix?: string;
  @Field({ nullable: true })
  nickname?: string;
  @Field({ nullable: true })
  gender?: 'male' | 'female';
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
  osId?: string;
  @Field({ nullable: true })
  pvsId?: string;
  @Field({ nullable: true })
  cspanId?: string;
  @Field({ nullable: true })
  twitterId?: string; // e.g., 'RepJohnCurtis'
  @Field({ nullable: true })
  facebookId?: string; // e.g., 'CongressmanRalphAbraham'
  @Field({ nullable: true })
  youtubeId?: string;

  // pic
  @Field({ nullable: true })
  profilePictureUri?: string; // should be a uri to our service

  // roles
  @Field(() => [LegislatorRole])
  congressRoles?: Array<LegislatorRole>;

}

@ObjectType()
export class LegislatorRole {
  @Field(() => [Int])
  congressNumbers!: Array<number>;
  @Field()
  chamber!: string;
  @Field()
  startDate!: number;
  @Field()
  endDate!: number;
  @Field()
  party!: LegislatorRoleParty;
  @Field()
  state!: State | Territory | Region;
  @Field(() => Int, { nullable: true })
  district?: number;
  @Field(() => Int, { nullable: true })
  senatorClass?: number;
}
