import { useEffect, useState } from 'react';

type Era =
  | 'Lover'
  | 'Fearless'
  | 'Evermore'
  | 'Reputation'
  | 'Speak Now'
  | 'Red'
  | 'Folklore'
  | '1989'
  | 'Acoustic Set'
  | 'Midnights'
  | 'Credits'
  | 'Acoustic Collection';

const eras: {
  [key in Era]: string;
} = {
  Lover: 'bg-pink-500',
  Fearless: 'bg-amber-500',
  Evermore: 'bg-orange-500',
  Reputation: 'bg-black',
  'Speak Now': 'bg-purple-500',
  Red: 'bg-red-500',
  Folklore: 'bg-gray-500',
  1989: 'bg-blue-700',
  'Acoustic Set': 'bg-brown-500',
  Midnights: 'bg-blue-300',
  Credits: 'bg-gray-500',
  'Acoustic Collection': '',
};

const songs = [
  { name: 'Miss Americana & the Heartbreak Prince (excerpt)', time: 122, era: 'Lover' },
  { name: 'Cruel Summer', time: 165, era: 'Lover' },
  { name: 'The Man', time: 557, era: 'Lover' },
  { name: 'You Need to Calm Down', time: 764, era: 'Lover' },
  { name: 'Lover', time: 986, era: 'Lover' },
  { name: 'The Archer (EXTENDED)', time: 1219, era: 'Lover' },

  { name: 'Fearless', time: 1442, era: 'Fearless' },
  { name: 'You Belong With Me', time: 1615, era: 'Fearless' },
  { name: 'Love Story', time: 1860, era: 'Fearless' },

  { name: 'Willow', time: 2134, era: 'Evermore' },
  { name: 'Marjorie', time: 2387, era: 'Evermore' },
  { name: 'Champagne Problems', time: 2719, era: 'Evermore' },
  { name: 'Tolerate It', time: 3108, era: 'Evermore' },

  { name: '...Ready for It?', time: 3301, era: 'Reputation' },
  { name: 'Delicate', time: 3536, era: 'Reputation' },
  { name: "Don't Blame Me", time: 3771, era: 'Reputation' },
  { name: 'Look What You Made Me Do', time: 3961, era: 'Reputation' },

  { name: 'Enchanted', time: 4210, era: 'Speak Now' },
  { name: 'Long Live (EXTENDED)', time: 4480, era: 'Speak Now' },

  { name: '22', time: 4818, era: 'Red' },
  { name: 'We Are Never Ever Getting Back Together', time: 5046, era: 'Red' },
  { name: 'I Knew You Were Trouble', time: 5244, era: 'Red' },
  { name: 'All Too Well (10 Minute Version)', time: 5440, era: 'Red' },

  { name: 'The 1', time: 6043, era: 'Folklore' },
  { name: 'Betty', time: 6370, era: 'Folklore' },
  { name: 'The Last Great American Dynasty', time: 6659, era: 'Folklore' },
  { name: 'August', time: 6891, era: 'Folklore' },
  { name: 'Illicit Affairs (excerpt)', time: 7096, era: 'Folklore' },
  { name: 'My Tears Ricochet', time: 7203, era: 'Folklore' },
  { name: "Cardigan (TAYLOR'S VERSION)", time: 7451, era: 'Folklore' },

  { name: 'Style', time: 7701, era: '1989' },
  { name: 'Blank Space', time: 7843, era: '1989' },
  { name: 'Shake It Off', time: 8099, era: '1989' },
  { name: 'Wildest Dreams (EXTENDED)', time: 8316, era: '1989' },
  { name: 'Bad Blood', time: 8459, era: '1989' },

  { name: 'Our Song', time: 8689, era: 'Acoustic Set' },
  { name: "You're on Your Own, Kid", time: 8919, era: 'Acoustic Set' },

  { name: 'Lavender Haze', time: 9223, era: 'Midnights' },
  { name: 'Anti-Hero', time: 9423, era: 'Midnights' },
  { name: 'Midnight Rain', time: 9632, era: 'Midnights' },
  { name: 'Vigilante Shit', time: 9800, era: 'Midnights' },
  { name: 'Bejeweled', time: 9972, era: 'Midnights' },
  { name: 'Mastermind', time: 10176, era: 'Midnights' },
  { name: 'Karma', time: 10387, era: 'Midnights' },

  { name: 'Long Live/End Credits', time: 10725, era: 'Credits' },

  { name: "I Can See You (TAYLOR'S VERSION)", time: 11141, era: 'Acoustic Collection' },
  { name: "Death By a Thousand Cuts (TAYLOR'S VERSION)", time: 11425, era: 'Acoustic Collection' },
  { name: 'Our Song', time: 11638, era: 'Acoustic Collection' },
  { name: "You Are in Love (TAYLOR'S VERSION)", time: 11872, era: 'Acoustic Collection' },
  { name: "Maroon (TAYLOR'S VERSION)", time: 12154, era: 'Acoustic Collection' },
  { name: "You're on Your Own, Kid", time: 12402, era: 'Acoustic Collection' },
];

const fastForward = (steps: number) => {
  const quickFastForward = document.querySelector('.quick-fast-forward');
  for (let i = 0; i < steps; i++) {
    if (quickFastForward && quickFastForward.shadowRoot) {
      const button = quickFastForward.shadowRoot.querySelector('button');
      if (button) {
        button.click();
      }
    }
  }
};

const quickRewind = (steps: number) => {
  const quickRewind = document.querySelector('.quick-rewind');
  for (let i = 0; i < steps; i++) {
    if (quickRewind && quickRewind.shadowRoot) {
      const button = quickRewind.shadowRoot.querySelector('button');
      if (button) {
        button.click();
      }
    }
  }
};

export default function App() {
  const [time, setTime] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    console.log('runtime content view loaded');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = document.querySelector('video')?.currentTime || 0;
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const previousSong = () => {
    const currentSong = songs.filter(song => song.time <= time).slice(-1)[0]?.name;
    const currentIndex = songs.findIndex(song => song.name === currentSong);
    if (currentIndex !== -1 && currentIndex < songs.length - 1) {
      const nextSong = songs[currentIndex - 1];
      const videoElement = document.querySelector('video');
      if (videoElement) {
        const timeDifference = videoElement.currentTime - nextSong.time;
        const steps = timeDifference / 10;
        quickRewind(steps);
      }
    }
  };

  const nextSong = () => {
    const currentSong = songs.filter(song => song.time <= time).slice(-1)[0]?.name;
    const currentIndex = songs.findIndex(song => song.name === currentSong);
    if (currentIndex !== -1 && currentIndex < songs.length - 1) {
      const nextSong = songs[currentIndex + 1];
      const videoElement = document.querySelector('video');
      if (videoElement) {
        const timeDifference = nextSong.time - videoElement.currentTime;
        const steps = timeDifference / 10;
        fastForward(steps);
      }
    }
  };

  const skipToTime = (skipTime: number) => {
    const currentTime = document.querySelector('video')?.currentTime || 0;
    setShowPlaylist(false);

    if (time > skipTime) {
      // Skip backwards
      const timeDifference = currentTime - skipTime;
      const steps = timeDifference / 10;
      quickRewind(steps);
    } else {
      // Skip forwards
      const timeDifference = skipTime - currentTime;
      const steps = timeDifference / 10;
      fastForward(steps);
    }
  };
  const song = songs.filter(song => song.time <= time).slice(-1)[0];
  const eraColor = song?.era ? eras[song.era as Era] : 'bg-gray-500';

  const titleField = document.querySelector('.title-field');

  if (titleField && titleField.textContent && titleField.textContent.toLowerCase().includes('taylor swift')) {
    return (
      <div className="eras-tour-container ">
        <div className="border-white border-2 rounded-md  mb-2">
          <div className={`${eraColor} text-white text-center rounded-t-md p-2`}>{song.era}</div>
          <div className="p-2 bg-white rounded-b-md">
            <div className="eras-control-bar">
              <button onClick={previousSong}>⏮️</button>
              <div id="current-song">{songs.filter(song => song.time <= time).slice(-1)[0]?.name || 'End of Show'}</div>
              <button onClick={nextSong}>⏭️</button>
            </div>
            <button className="show-playlist" onClick={() => setShowPlaylist(!showPlaylist)}>
              Show playlist
            </button>
          </div>
        </div>
        {showPlaylist && (
          <div
            className="playlist bg-white rounded-md p-2"
            style={{
              maxHeight: '200px',
              overflowY: 'scroll',
            }}>
            <ul>
              {songs.map(song => (
                <li key={`${song.name}-${song.era}`}>
                  <button
                    onClick={() => {
                      skipToTime(song.time);
                    }}>
                    {song.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  } else {
    return <div></div>;
  }
}
