export interface SpotifyProfile {
  /**
   * almost all the fields from the Spotify ProfileAPI
   * Reference: https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
   * Optional fields are marked with a ? because we are not using them yet
   */
  country: string;
  display_name: string;
  email: string;
  explicit_content?: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls?: {
    spotify: string;
  };
  followers?: {
    href: string | null;
    total: number;
  };
  id: string;
  images?: [];
  product: 'premium' | 'free';
  type: 'user';
  uri: string;
}

export interface SpotifyCurrentTrack {
  /**
   * almost all the fields from the Spotify Current TrackAPI
   * Reference: https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playing-track
   */
  timestamp: number;
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: string;
    uri: string;
  };
  progress_ms: number;
  item: {
    album: {
      album_type: 'album';
      artists: {
        id: string;
        name: string;
        type: 'artist';
        uri: string;
      }[];
      available_markets: string[];
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      images: {
        height: number;
        url: string;
        width: number;
      }[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
  };
  currently_playing_type: string;
  actions: {
    disallows: {
      resuming: boolean;
    };
  };
  is_playing: boolean;
}
