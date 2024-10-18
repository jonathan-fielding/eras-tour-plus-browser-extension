import { withErrorBoundary, withSuspense } from '@extension/shared';
import '@src/Popup.css';

const Popup = () => {
  return (
    <div className={`App bg-gray-800`}>
      <header className={`App-header text-gray-100`}>Eras Tour Plus</header>
      <main className="App-body">
        <p>Eras Tour Plus should automatically enable when you visit the Eras Tour on Disney Plus</p>
        <p className="mt-4">
          <a
            href="https://github.com/jonathan-fielding/eras-tour-plus-browser-extension/issues"
            target="_blank"
            rel="noreferrer"
            className="button">
            Report issues
          </a>
        </p>
        <p className="mt-4">
          <a
            href="https://github.com/jonathan-fielding/eras-tour-plus-browser-extension"
            target="_blank"
            rel="noreferrer"
            className="button">
            Contribute on GitHub
          </a>
        </p>
      </main>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
