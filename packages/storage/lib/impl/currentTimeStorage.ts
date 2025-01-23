import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { BaseStorage } from '../base/types';

type CurrentTime = number;

type ManifestStorage = BaseStorage<CurrentTime> & {
  updateTime: (time: number) => Promise<void>;
};

const storage = createStorage<CurrentTime>('time-storage-key', {} as CurrentTime, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const currentTimeStorage: ManifestStorage = {
  ...storage,
  updateTime: async (time: number) => {
    await storage.set(() => {
      return time;
    });
  },
};
