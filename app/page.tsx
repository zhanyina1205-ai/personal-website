const feishuUrl =
  "https://my.feishu.cn/wiki/WfEOwMIK4ilHUQk7PpucZVjRnlc?from=from_copylink";

export default function Home() {
  return (
    <main>
      <nav className="nav" aria-label="主导航">
        <a className="wordmark" href="#top" aria-label="返回首页">
          ZYN.
        </a>
        <div className="navLinks">
          <a href="#about">关于</a>
          <a href="#notes">片段</a>
          <a href={feishuUrl} target="_blank" rel="noreferrer">
            飞书空间 <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="pattern" aria-hidden="true">
          <div className="shape s1" />
          <div className="shape s2" />
          <div className="shape s3" />
          <div className="shape s4" />
          <div className="shape s5" />
          <div className="shape s6" />
          <div className="shape s7" />
          <div className="shape s8" />
          <div className="shape s9" />
        </div>
        <div className="heroCopy">
          <p className="eyebrow">Hello, I&apos;m</p>
          <h1 id="hero-title">詹依娜</h1>
          <p className="heroIntro">在这里，收藏灵感、作品和生活里值得记住的片刻。</p>
        </div>
        <a className="scrollHint" href="#about">
          向下认识我 <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="about section" id="about" aria-labelledby="about-title">
        <p className="sectionNo">01 / ABOUT</p>
        <div className="aboutGrid">
          <h2 id="about-title">
            好奇地观察，
            <br />
            真诚地表达。
          </h2>
          <div className="aboutText">
            <p>
              你好，我是詹依娜。这个小站是我的线上房间——关于我正在做的事、最近喜欢的东西，以及不断长出来的新想法。
            </p>
            <p>
              我相信好的作品有温度，也有清晰的方向。愿每一次创造，都让人与人之间的距离更近一点。
            </p>
          </div>
        </div>
      </section>

      <section className="notes section" id="notes" aria-labelledby="notes-title">
        <div className="notesHeading">
          <p className="sectionNo">02 / NOTES</p>
          <h2 id="notes-title">此刻，正在发生</h2>
        </div>
        <div className="noteList">
          <article>
            <span>01</span>
            <h3>收集灵感</h3>
            <p>把散落在日常里的颜色、声音与念头，慢慢整理成自己的语言。</p>
          </article>
          <article>
            <span>02</span>
            <h3>持续创作</h3>
            <p>保持手感，也保持开放。让每一个小尝试，都成为下一段旅程的开头。</p>
          </article>
          <article>
            <span>03</span>
            <h3>分享与连接</h3>
            <p>将过程留存下来，也期待遇见有趣的人、观点和新的合作可能。</p>
          </article>
        </div>
      </section>

      <section className="journal section" aria-labelledby="journal-title">
        <div className="journalCard">
          <p className="sectionNo">MY FEISHU SPACE</p>
          <h2 id="journal-title">更多关于我的内容，<br />都在这里。</h2>
          <a className="button" href={feishuUrl} target="_blank" rel="noreferrer">
            打开飞书空间 <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="miniPattern" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </div>
      </section>

      <footer>
        <p>詹依娜 · ZHAN YINA</p>
        <p>把喜欢的事，认真地做下去。</p>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </main>
  );
}
