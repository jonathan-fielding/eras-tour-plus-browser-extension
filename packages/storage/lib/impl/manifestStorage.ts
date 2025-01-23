import { StorageEnum } from '../base/enums';
import { createStorage } from '../base/base';
import type { Manifest, BaseStorage } from '../base/types';

type ManifestStorage = BaseStorage<Manifest> & {
  updateManifest: (newManifest: Manifest) => Promise<void>;
};

const storage = createStorage<Manifest>('manifest-storage-key', {} as Manifest, {
  storageEnum: StorageEnum.Local,
  liveUpdate: true,
});

export const manifestStorage: ManifestStorage = {
  ...storage,
  updateManifest: async (newManifest: Manifest) => {
    await storage.set(() => newManifest);
  },
};
