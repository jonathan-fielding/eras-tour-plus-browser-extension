import { createRoot } from 'react-dom/client';
import App from '@src/App';
import tailwindcssOutput from '../dist/tailwind-output.css?inline';

const root = document.createElement('div');
root.id = 'chrome-extension-eras-tour-plus';
root.style.zIndex = '9999';
root.style.position = 'fixed';
root.style.top = '10px';
root.style.right = '10px';
root.style.width = '300px';
root.style.maxWidth = '50%';

const waitForElement = (selector: string, timeout: number) => {
  return new Promise<Element | null>(resolve => {
    const interval = 500;
    let elapsedTime = 0;

    const checkExist = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(checkExist);
        resolve(element);
      } else if (elapsedTime >= timeout) {
        clearInterval(checkExist);
        resolve(null);
      }
      elapsedTime += interval;
    }, interval);
  });
};

const captureM3U8Files = () => {
  console.log('capturing m3u8 files');
  const originalFetch = window.fetch;
  window.fetch = async function (input, init) {
    const url = typeof input === 'string' ? input : input.toString();
    if (url.includes('.m3u8')) {
      console.log('m3u8 file loaded:', url);
    }
    return originalFetch.call(this, input, init);
  };
};

captureM3U8Files();

waitForElement('.btm-media-clients', 30000).then(element => {
  if (!element) {
    return;
  }

  element.append(root);

  const rootIntoShadow = document.createElement('div');
  rootIntoShadow.id = 'shadow-root';

  const shadowRoot = root.attachShadow({ mode: 'open' });

  if (navigator.userAgent.includes('Firefox')) {
    /**
     * In the firefox environment, adoptedStyleSheets cannot be used due to the bug
     * @url https://bugzilla.mozilla.org/show_bug.cgi?id=1770592
     *
     * Injecting styles into the document, this may cause style conflicts with the host page
     */
    const styleElement = document.createElement('style');
    styleElement.innerHTML = tailwindcssOutput;
    shadowRoot.appendChild(styleElement);
  } else {
    /** Inject styles into shadow dom */
    const globalStyleSheet = new CSSStyleSheet();
    globalStyleSheet.replaceSync(tailwindcssOutput);
    shadowRoot.adoptedStyleSheets = [globalStyleSheet];
  }

  shadowRoot.appendChild(rootIntoShadow);
  createRoot(rootIntoShadow).render(<App />);
});
