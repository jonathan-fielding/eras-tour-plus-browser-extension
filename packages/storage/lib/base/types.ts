/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StorageEnum } from './enums';

export type ValueOrUpdate<D> = D | ((prev: D) => Promise<D> | D);

export type BaseStorage<D> = {
  get: () => Promise<D>;
  set: (value: ValueOrUpdate<D>) => Promise<void>;
  getSnapshot: () => D | null;
  subscribe: (listener: () => void) => () => void;
};

export type StorageConfig<D = string> = {
  /**
   * Assign the {@link StorageEnum} to use.
   * @default Local
   */
  storageEnum?: StorageEnum;
  /**
   * Only for {@link StorageEnum.Session}: Grant Content scripts access to storage area?
   * @default false
   */
  sessionAccessForContentScripts?: boolean;
  /**
   * Keeps state live in sync between all instances of the extension. Like between popup, side panel and content scripts.
   * To allow chrome background scripts to stay in sync as well, use {@link StorageEnum.Session} storage area with
   * {@link StorageConfig.sessionAccessForContentScripts} potentially also set to true.
   * @see https://stackoverflow.com/a/75637138/2763239
   * @default false
   */
  liveUpdate?: boolean;
  /**
   * An optional props for converting values from storage and into it.
   * @default undefined
   */
  serialization?: {
    /**
     * convert non-native values to string to be saved in storage
     */
    serialize: (value: D) => string;
    /**
     * convert string value from storage to non-native values
     */
    deserialize: (text: string) => D;
  };
};

export interface Manifest {
  allowCache: boolean;
  discontinuityStarts: any[];
  dateRanges: DateRange[];
  iFramePlaylists: IFramePlaylist[];
  segments: Segment[];
  independentSegments: boolean;
  mediaGroups: any;
  playlists: Playlist[];
  version: number;
  targetDuration: number;
  playlistType: string;
  mediaSequence: number;
  dateTimeString: string;
  dateTimeObject: string;
  contentProtection: any;
  discontinuitySequence: number;
  endList: boolean;
}

export interface DateRange {
  xStartOffset?: number;
  duration?: number;
  startDate: string;
  id: string;
  xAssetList?: string;
  xResumeOffset?: number;
  endDate?: string;
  class?: string;
  xSnap?: string;
  cue?: string;
}

export interface IFramePlaylist {
  attributes: Attributes;
  uri: string;
  timeline: number;
}

export interface Attributes {
  URI: string;
  CHARACTERISTICS: string;
  'HDCP-LEVEL': string;
  'VIDEO-RANGE': string;
  RESOLUTION: Resolution;
  CODECS: string;
  BANDWIDTH: number;
}

export interface Resolution {
  width: number;
  height: number;
}

export interface Segment {
  attributes?: any;
  uri: string;
  timeline: number;
  programDateTime?: number;
  dateTimeString?: string;
  dateTimeObject?: string;
  duration?: number;
  key?: any;
  map?: any;
}

export interface Playlist {
  attributes?: PlayListAttributes;
  uri: string;
  timeline: number;
  programDateTime?: number;
  dateTimeString?: string;
  dateTimeObject?: string;
  duration?: number;
  key?: any;
  map?: any;
}

export interface PlayListAttributes {
  SUBTITLES: string;
  AUDIO: string;
  CHARACTERISTICS: string;
  'HDCP-LEVEL': string;
  'VIDEO-RANGE': string;
  'FRAME-RATE': number;
  RESOLUTION: Resolution;
  CODECS: string;
  'AVERAGE-BANDWIDTH': string;
  BANDWIDTH: number;
}
