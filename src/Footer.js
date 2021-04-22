const Footer = () => {
  return (
    <footer>
      <div className="wrapper">
        <section className="creators">
          <h2>Creators</h2>
          <p>
            <a
              className="githubIconMini"
              href="https://github.com/AhmedAlihashi"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github-square "></i>
            </a>
            Ahmed Ali
          </p>
          <p>
            <a
              className="githubIconMini"
              href="https://github.com/ajtoure"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github-square "></i>
            </a>
            AJ Toure
          </p>
          <p>
            <a
              className="githubIconMini"
              href="https://github.com/justint-7"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github-square "></i>
            </a>
            Justin Tseng
          </p>
          <p>
            <a
              className="githubIconMini"
              href="https://github.com/ahotipid"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-github-square "></i>
            </a>
            Kornthip Sangsuriyachot
          </p>
        </section>
        <section className="credits">
          <p>
            Created @
            <a href="https://junocollege.com/" target="_blank" rel="noreferrer">
              Juno College
            </a>
          </p>
          <p>
            Powered by
            <a
              href="https://www.datamuse.com/api/"
              target="_blank"
              rel="noreferrer"
            >
              datamuse API
            </a>
          </p>
          <p>
            Trophy icon made by
            <a
              href="https://www.flaticon.com/authors/nikita-golubev"
              title="Nikita Golubev"
              target="_blank"
              rel="noreferrer"
            >
              Nikita Golubev
            </a>
          </p>
          <p>
            from
            <a
              href="https://www.flaticon.com/"
              title="Flaticon"
              target="_blank"
              rel="noreferrer"
            >
              www.flaticon.com
            </a>
          </p>
          <a
            className="githubIcon"
            href="https://github.com/whatDoYouNo/whatDoYouNo"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github-square "></i>
          </a>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
