import 'webextension-polyfill';
import { Parser } from 'm3u8-parser';
import { currentTimeStorage, manifestStorage } from '@extension/storage';

interface PlaylistFile {
  uri: string;
  duration?: number;
}

const parser = new Parser();

chrome.webRequest.onResponseStarted.addListener(
  async details => {
    if (!details.initiator?.includes('https://www.disneyplus.com')) {
      return { cancel: false };
    }

    if (details.url.includes('m3u8')) {
      const file = await fetch(details.url);
      const fileContents = await file.text();
      parser.push(fileContents);
      parser.end();

      await manifestStorage.updateManifest(parser.manifest);
    }

    if (details.url.endsWith('mp4')) {
      const storedManifest = await manifestStorage.get();

      const videoPlaylist: PlaylistFile[] = storedManifest?.playlists.filter(
        (file: { uri: string; duration: number | undefined }) => {
          return file.uri.endsWith('mp4');
        },
      );

      if (videoPlaylist) {
        const playlistPosition = videoPlaylist.findIndex(file => {
          return details.url.includes(file.uri);
        });

        const time = videoPlaylist
          .filter((file, index) => {
            return index < playlistPosition;
          })
          .reduce((acc, file) => {
            return acc + (file.duration || 0);
          }, 0);

        await currentTimeStorage.updateTime(time);

        console.log(playlistPosition, time);
      }
    }

    return { cancel: false };
  },
  { urls: ['<all_urls>'] },
);

console.log('background loaded');
