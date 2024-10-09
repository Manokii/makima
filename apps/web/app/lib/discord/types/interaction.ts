export const InteractionType = {
  PING: 1,
  APPLICATION_COMMAND: 2,
  MESSAGE_COMPONENT: 3,
  APPLICATION_COMMAND_AUTOCOMPLETE: 4,
  MODAL_SUBMIT: 5,
} as const;
export type IntearctionType =
  (typeof InteractionType)[keyof typeof InteractionType];

export const InteractionContextType = {
  GUILD: 0,
  BOT_DM: 1,
  PRIVATE_CHANNEL: 2,
} as const;
export type InteractionContextType =
  (typeof InteractionContextType)[keyof typeof InteractionContextType];

const InstallationType = {
  GUILD_INSTALL: 0,
  USER_INSTALL: 1,
} as const;
type InstallationType =
  (typeof InstallationType)[keyof typeof InstallationType];
export type AuthorizingIntegrationOwners = Record<InstallationType, string>;

export enum ApplicationCommandType {
  CHAT_INPUT = 1,
  USER = 2,
  MESSAGE = 3,
  PRIMARY_ENTRY_POINT = 4,
}

export interface DiscordInteractionRequest {
  app_permissions: string;
  application_id: string;
  authorizing_integration_owners: AuthorizingIntegrationOwners;
  channel: Channel;
  channel_id: string;
  context: number;
  data: ApplicationCommand;
  entitlement_sku_ids: string[];
  entitlements: string[];
  guild: Guild;
  guild_id: string;
  guild_locale: string;
  id: string;
  locale: string;
  member: Member;
  token: string;
  type: number;
  version: number;
}

export interface Channel {
  flags: number;
  guild_id: string;
  id: string;
  last_message_id: string;
  name: string;
  nsfw: boolean;
  parent_id: null;
  permissions: string;
  position: number;
  rate_limit_per_user: number;
  topic: null;
  type: number;
}

export type ApplicationCommand =
  | {
      id: string;
      name: string;
      options: ApplicationCommandOption[];
      type: ApplicationCommandType.CHAT_INPUT;
    }
  | {
      id: string;
      name: string;
      resolved: Resolved;
      target_id: string;
      type: ApplicationCommandType.MESSAGE;
    };

export interface ApplicationCommandOption {
  name: string;
  type: number;
  value: string;
}

export interface Resolved {
  messages: Messages;
}

export type Messages = Record<string, Message>;
export interface Message {
  attachments: unknown[];
  author: Author;
  channel_id: string;
  components: unknown[];
  content: string;
  edited_timestamp: null;
  embeds: unknown[];
  flags: number;
  id: string;
  mention_everyone: boolean;
  mention_roles: unknown[];
  mentions: unknown[];
  pinned: boolean;
  timestamp: Date;
  tts: boolean;
  type: number;
}

export interface Author {
  avatar: string;
  avatar_decoration_data: null;
  bot: boolean;
  clan: null;
  discriminator: string;
  global_name: string;
  id: string;
  public_flags: number;
  system: boolean;
  username: string;
}

export interface Guild {
  features: string[];
  id: string;
  locale: string;
}

export interface Member {
  avatar: null;
  banner: null;
  communication_disabled_until: null;
  deaf: boolean;
  flags: number;
  joined_at: Date;
  mute: boolean;
  nick: null;
  pending: boolean;
  permissions: string;
  premium_since: null;
  roles: string[];
  unusual_dm_activity_until: null;
  user: User;
}

export interface User {
  avatar: string;
  avatar_decoration_data: AvatarDecorationData;
  clan: null;
  discriminator: string;
  global_name: null;
  id: string;
  public_flags: number;
  username: string;
}

export interface AvatarDecorationData {
  asset: string;
  expires_at: null;
  sku_id: string;
}
