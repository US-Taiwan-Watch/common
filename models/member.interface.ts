import { ObjectType, Field, Int } from "type-graphql";
import {
  MEMBER_ROLE_PARTIES,
  REGIONS,
  STATES,
  TERRITORIES,
} from "../constants/member-constants";

export type GenderType = "male" | "female";

export type MemberRoleParty = typeof MEMBER_ROLE_PARTIES[number];
export type State = typeof STATES[number];
export type Territory = typeof TERRITORIES[number];
export type Region = typeof REGIONS[number];

// Outter Member data => data from old database or editted by editors
// Inner Member data (propublica / unitedstates) => data queried from other sources

@ObjectType()
export class Member {
  constructor(id: string) {
    this.id = id;
  }

  @Field()
  id!: string; // bioGuideId
  id_alias?: string; // alias ID for the case that a member's ID is changed [Manually update]

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
  cspanId?: string; // C-SPAN congress TV channel ID
  @Field({ nullable: true })
  twitterId?: string; // e.g., 'RepJohnCurtis'
  @Field({ nullable: true })
  facebookId?: string; // e.g., 'CongressmanRalphAbraham'
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
  revokedFields?: Array<keyof Member>;
}

@ObjectType()
export class MemberRole {
  @Field(() => [Int])
  congressNumbers!: Array<number>;
  @Field()
  chamber!: "s" | "h";
  @Field()
  startDate!: string; // YYYY-MM-DD (filling 0's for invalid data)
  @Field()
  endDate!: string; // YYYY-MM-DD (filling 9's for invalid data)
  party?: MemberRoleParty; // phased out
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
