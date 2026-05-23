export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 py-10 px-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>
        Game assets & unit icons data are the property of
        {' '}
        <a
          href="https://www.beyondallreason.info"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-300"
        >
          Beyond All Reason
        </a>
      </p>
      <div className="mt-4 flex justify-center gap-6">
        <a
          href="https://github.com/beyond-all-reason/Beyond-All-Reason"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          BAR Official Repo
        </a>
        <a
          href="https://github.com/Riley19280/bar-hotkeys"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          Contribute
        </a>
        <a
          href="https://github.com/Riley19280/bar-hotkeys/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          Report an issue
        </a>
      </div>
    </footer>
  )
}
