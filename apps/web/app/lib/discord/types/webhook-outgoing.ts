export interface WebhookOutgoing {
  /** doesn't update when updating a message */
  username?: string;
  /** doesn't update when updating a message */
  avatar_url?: string;
  content: string;
  embeds?: Partial<Embed>[];
}

export interface Embed {
  author: Author;
  title: string;
  url: string;
  description: string;
  color: number;
  fields: Field[];
  thumbnail: Image;
  image: Image;
  footer: Footer;
}

export interface Author {
  name: string;
  url: string;
  icon_url: string;
}

export interface Field {
  name: string;
  value: string;
  inline?: boolean;
}

export interface Footer {
  text: string;
  icon_url: string;
}

export interface Image {
  url: string;
}
