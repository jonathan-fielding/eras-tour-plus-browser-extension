import { useEffect, useState } from 'react';

const songs = [
  { name: 'Miss Americana & the Heartbreak Prince (excerpt)', time: 122 },
  { name: 'Cruel Summer', time: 165 },
  { name: 'The Man', time: 557 },
  { name: 'You Need to Calm Down', time: 764 },
  { name: 'Lover', time: 986 },
  { name: 'The Archer (EXTENDED)', time: 1219 },
  { name: 'Fearless', time: 1442 },
  { name: 'You Belong With Me', time: 1615 },
  { name: 'Love Story', time: 1860 },
  { name: 'Willow', time: 2134 },
  { name: 'Marjorie', time: 2387 },
  { name: 'Champagne Problems', time: 2719 },
  { name: 'Tolerate It', time: 3108 },
  { name: '...Ready for It?', time: 3301 },
  { name: 'Delicate', time: 3536 },
  { name: "Don't Blame Me", time: 3771 },
  { name: 'Look What You Made Me Do', time: 3961 },
  { name: 'Enchanted', time: 4210 },
  { name: 'Long Live (EXTENDED)', time: 4480 },
  { name: '22', time: 4818 },
  { name: 'We Are Never Ever Getting Back Together', time: 5046 },
  { name: 'I Knew You Were Trouble', time: 5244 },
  { name: 'All Too Well (10 Minute Version)', time: 5440 },
  { name: 'The 1', time: 6043 },
  { name: 'Betty', time: 6370 },
  { name: 'The Last Great American Dynasty', time: 6659 },
  { name: 'August', time: 6891 },
  { name: 'Illicit Affairs (excerpt)', time: 7096 },
  { name: 'My Tears Ricochet', time: 7203 },
  { name: "Cardigan (TAYLOR'S VERSION)", time: 7451 },
  { name: 'Style', time: 7701 },
  { name: 'Blank Space', time: 7843 },
  { name: 'Shake It Off', time: 8099 },
  { name: 'Wildest Dreams (EXTENDED)', time: 8316 },
  { name: 'Bad Blood', time: 8459 },
  { name: 'Our Song', time: 8689 },
  { name: "You're on Your Own, Kid", time: 8919 },
  { name: 'Lavender Haze', time: 9223 },
  { name: 'Anti-Hero', time: 9423 },
  { name: 'Midnight Rain', time: 9632 },
  { name: 'Vigilante Shit', time: 9800 },
  { name: 'Bejeweled', time: 9972 },
  { name: 'Mastermind', time: 10176 },
  { name: 'Karma', time: 10387 },
  { name: 'Long Live/End Credits', time: 10725 },
  { name: "I Can See You (TAYLOR'S VERSION)", time: 11141 },
  { name: "Death By a Thousand Cuts (TAYLOR'S VERSION)", time: 11425 },
  { name: 'Our Song (Accoustic)', time: 11638 },
  { name: "You Are in Love (TAYLOR'S VERSION)", time: 11872 },
  { name: "Maroon (TAYLOR'S VERSION)", time: 12154 },
  { name: "You're on Your Own, Kid (Accoustic)", time: 12402 },
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

  const titleField = document.querySelector('.title-field');
  if (titleField && titleField.textContent && titleField.textContent.toLowerCase().includes('taylor swift')) {
    return (
      <div className="runtime-content-view-text">
        Current Song:
        <div className="eras-control-bar">
          <button onClick={previousSong}>⏮️</button>
          <div id="current-song">{songs.filter(song => song.time <= time).slice(-1)[0]?.name || 'End of Show'}</div>
          <button onClick={nextSong}>⏭️</button>
        </div>
        <button className="show-playlist" onClick={() => setShowPlaylist(!showPlaylist)}>
          Show playlist
        </button>
        <div className="playlist" style={showPlaylist ? { height: '300px' } : { height: '1px', overflow: 'hidden' }}>
          <ul>
            {songs.map(song => (
              <li key={song.name}>
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
      </div>
    );
  } else {
    return <div></div>;
  }
}
