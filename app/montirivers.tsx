const reportUrl = "https://gcn0sluri72f.feishu.cn/docx/Apo4dK2l8oVlA4xaOL5ciDAbnag";

type Account = {
  name: string; handle: string; url: string;
  followers: number; engage: number; median: number;
  position: string; role: string;
  note: { title: string; href: string; likes: number; saves: number; comments: number; pinned?: boolean; latest?: boolean };
};

// 数据来自 2026.11.01 对 6 个门店顾问账号的小红书主页核查，按粉丝量降序排列。
const accounts: Account[] = [
  {
    name: "Carrie", handle: "MontiRivers山河集Carrie", url: "https://www.xiaohongshu.com/user/profile/690cd5ff000000003702dbf6",
    followers: 612, engage: 2398, median: 6.5, position: "品牌诗意表达", role: "自我奖励与成套选购",
    note: { title: "MontiRivers山河集 无理由四金🙋‍♀️", href: "https://www.xiaohongshu.com/explore/6a83c1b800000000250153f9", likes: 730, saves: 269, comments: 74, pinned: true },
  },
  {
    name: "Jenny", handle: "山河集深圳店Jenny", url: "https://www.xiaohongshu.com/user/profile/6a72b28b0000000013022c0a",
    followers: 318, engage: 1814, median: 7.5, position: "深圳门店身份", role: "工艺讲解与选购答疑",
    note: { title: "Endless Summer·无尽夏🌿颈间诗", href: "https://www.xiaohongshu.com/explore/6a87dbef0000000033026a70", likes: 200, saves: 112, comments: 10, pinned: true },
  },
  {
    name: "Celia", handle: "MontiRivers山河集Celia", url: "https://www.xiaohongshu.com/user/profile/6921c403000000003702abd3",
    followers: 78, engage: 387, median: 4.5, position: "高级私人销售顾问", role: "顾问式对比与试戴建议",
    note: { title: "心心念念的戒指", href: "https://www.xiaohongshu.com/explore/6ae59d3b000000001a017298", likes: 5, saves: 1, comments: 0, latest: true },
  },
  {
    name: "Emma", handle: "MontiRivers山河集深圳店Emma", url: "https://www.xiaohongshu.com/user/profile/674d4535000000001c01a13f",
    followers: 72, engage: 544, median: 6, position: "深圳店 · 通勤场景", role: "通勤搭配与店员试戴",
    note: { title: "谁懂啊！实物美到相机根本拍不出来😭", href: "https://www.xiaohongshu.com/explore/6ae5c79f000000002702c079", likes: 13, saves: 5, comments: 0, latest: true },
  },
  {
    name: "Krystal", handle: "MontiRivers山河集Krystal", url: "https://www.xiaohongshu.com/user/profile/6a34fa200000000010000800",
    followers: 67, engage: 570, median: 7.5, position: "品牌诗意表达", role: "材质工艺与佩戴知识",
    note: { title: "山河集的耳钉，真的好美！", href: "https://www.xiaohongshu.com/explore/6ae15d0f00000000340363f5", likes: 37, saves: 17, comments: 2 },
  },
  {
    name: "Laura", handle: "Montirivers 山河集 Laura", url: "https://www.xiaohongshu.com/user/profile/5ab5bda311be10018cfe66f3",
    followers: 18, engage: 136, median: 5, position: "基础建设中", role: "基础建设与轻量内容测试",
    note: { title: "无尽夏绣球花项链，把希望和圆满送给你😊", href: "https://www.xiaohongshu.com/explore/6aa268f9000000002b00381d", likes: 42, saves: 5, comments: 4 },
  },
];

// 公开评论里出现的真实咨询信号——本次核查未取后台数据，这些是主页上可见的「触发进一步了解」的动作。
const signals = [
  { from: "Carrie", quote: "评论问「项链多少钱」，作者回复查看私信", tag: "询价" },
  { from: "Jenny", quote: "置顶项链视频下有「怎么买」提问与作者回复", tag: "购买方式" },
  { from: "Krystal", quote: "用户问「纯金还是 18K」，作者答复足金", tag: "材质确认" },
  { from: "Laura", quote: "评论出现「有时间去看一下」的到店意向", tag: "到店意向" },
];

const division = [
  { name: "Carrie", topic: "一套四金，怎么拆成日常可戴的组合？", track: "组合收藏 · 款式咨询" },
  { name: "Jenny", topic: "手工雕金与镜面高光，上手差在哪里？", track: "工艺尺寸提问 · 有效咨询" },
  { name: "Celia", topic: "同是水滴系列，大小款分别适合谁？", track: "试戴问题 · 预约咨询" },
  { name: "Krystal", topic: "评论区问的足金还是 18K，该怎么确认？", track: "材质问答 · 保养收藏" },
  { name: "Emma", topic: "一件通勤上衣，换三种首饰是什么效果？", track: "搭配收藏 · 试戴意向" },
  { name: "Laura", topic: "第一次来门店试戴，先看哪三类款式？", track: "主页访问 · 关注 · 门店咨询" },
];

const maxFollowers = Math.max(...accounts.map(a => a.followers));
const totalFollowers = accounts.reduce((sum, a) => sum + a.followers, 0);
const totalEngage = accounts.reduce((sum, a) => sum + a.engage, 0);
const topTwoShare = (accounts[0].followers + accounts[1].followers) / totalFollowers * 100;

export function Montirivers() {
  return <section className="monti" id="montirivers" aria-labelledby="monti-title">
    <div className="monti-meta"><span>MONTIRIVERS / 山河集</span><span>服务的品牌 · 珠宝首饰</span></div>

    <header className="monti-head">
      <div className="monti-head-copy">
        <p className="monti-script" aria-hidden="true">Shan He Ji</p>
        <h4 id="monti-title">MontiRivers 山河集<span>以足金、18K 与钻石为语言的珠宝品牌</span></h4>
        <p className="monti-lede">我为山河集管理过一组门店顾问的小红书账号，围绕系列内容与到店咨询做运营。下面是我对这个矩阵做的核查与判断。</p>
      </div>
      <dl className="monti-brandcard">
        <div><dt>门店</dt><dd>深圳 · PA MALL<br/><span>平安金融中心 M 层 N01</span></dd></div>
        <div><dt>品类</dt><dd>足金 / 18K / 钻石<br/><span>项链 · 戒指 · 耳饰</span></dd></div>
        <div><dt>代表系列</dt><dd>无尽夏 · 水滴<br/><span>花丝 · 山河 · 涟漪</span></dd></div>
      </dl>
    </header>

    <div className="monti-role">
      <span className="monti-role-label">MY ROLE / 我做的工作</span>
      <ul>
        <li><b>店员号矩阵运营</b><small>管理 6 个门店顾问账号的内容方向与分工。</small></li>
        <li><b>系列内容策划</b><small>把产品系列与门店顾问身份落到可发布的选题。</small></li>
        <li><b>账号核查与复盘</b><small>逐号核对粉丝、互动与咨询信号，给出改进方向。</small></li>
      </ul>
    </div>

    <div className="monti-overview">
      <div className="monti-chart-head"><h5>店员号矩阵总览</h5><span>6 个账号 · 粉丝、互动与日常表现</span></div>
      <ol className="monti-accounts">{accounts.map((a, i) => <li key={a.name}>
        <div className="monti-acc-top">
          <span className="monti-acc-mono" aria-hidden="true">{a.name[0]}</span>
          <a href={a.url} target="_blank" rel="noopener noreferrer"><b>{a.name}</b><span>{a.handle} ↗</span></a>
          {i < 2
            ? <span className="monti-acc-pos lead">{i === 0 ? "矩阵第一 ·" : "矩阵第二 ·"} {a.position}</span>
            : <span className="monti-acc-pos">{a.position}</span>}
        </div>
        <div className="monti-acc-bar"><i style={{ width: `${a.followers / maxFollowers * 100}%` }}/><em>{a.followers}<small>粉丝</small></em></div>
        <div className="monti-acc-metrics">
          <span>获赞与收藏 <b>{a.engage.toLocaleString()}</b></span>
          <span>近 10 条点赞中位数 <b>{a.median}</b></span>
        </div>
        <a className="monti-acc-note" href={a.note.href} target="_blank" rel="noopener noreferrer">
          {a.note.pinned && <span className="monti-note-tag">置顶样本</span>}
          {a.note.latest && <span className="monti-note-tag latest">最新样本</span>}
          <span className="monti-note-title">{a.note.title}</span>
          <span className="monti-note-stats">赞 {a.note.likes} · 藏 {a.note.saves} · 评 {a.note.comments} ↗</span>
        </a>
      </li>)}</ol>
    </div>

    <div className="monti-insight">
      <article className="monti-concentration">
        <span className="monti-insight-kicker">粉丝集中度</span>
        <h5>两个账号，占了近八成粉丝</h5>
        <div className="monti-stack" role="img" aria-label={`Carrie 与 Jenny 合计占六号粉丝加总的 ${topTwoShare.toFixed(1)}%`}>
          <i className="seg-carrie" style={{ width: `${accounts[0].followers / totalFollowers * 100}%` }}><span>Carrie</span></i>
          <i className="seg-jenny" style={{ width: `${accounts[1].followers / totalFollowers * 100}%` }}><span>Jenny</span></i>
          <i className="seg-rest"><span>其余四号</span></i>
        </div>
        <p>六号粉丝简单加总为 <b>{totalFollowers.toLocaleString()}</b>，获赞与收藏加总 <b>{totalEngage.toLocaleString()}</b>。Carrie 与 Jenny 合计 {accounts[0].followers + accounts[1].followers} 粉，占 <b>{topTwoShare.toFixed(1)}%</b>。其余四号仍在早期。</p>
      </article>
      <article className="monti-honest">
        <span className="monti-insight-kicker">一个要诚实说明的差距</span>
        <h5>置顶高光 ≠ 日常表现</h5>
        <div className="monti-gap">
          <div><span>Carrie 置顶笔记</span><b>730<small>赞</small></b></div>
          <i aria-hidden="true">vs</i>
          <div><span>近 10 条非置顶中位数</span><b>6.5<small>赞</small></b></div>
        </div>
        <p>置顶与日常相差两个量级。Jenny 近 10 条里也有单条 115 赞拉高观感。所以我用中位数看日常，不拿几条置顶代表账号水平。</p>
      </article>
    </div>

    <div className="monti-signals">
      <div className="monti-chart-head"><h5>内容带来的真实咨询信号</h5><span>取自主页公开评论 · 非后台数据</span></div>
      <ul className="monti-signal-list">{signals.map(s => <li key={s.from}>
        <span className="monti-signal-tag">{s.tag}</span>
        <p>{s.quote}</p>
        <span className="monti-signal-from">{s.from}</span>
      </li>)}</ul>
      <p className="monti-signal-foot">价格、购买方式、足金 / 18K 材质、到店意向都已在评论里出现——说明内容触发了进一步了解的动作。但本次未取后台私信、预约与成交数据，不据此计算转化率。</p>
    </div>

    <div className="monti-division">
      <div className="monti-chart-head"><h5>矩阵怎么分工</h5><span>待测试方案 · 不代表已验证有效</span></div>
      <ol className="monti-division-list">{division.map((d, i) => <li key={d.name}>
        <span className="monti-div-index">0{i + 1}</span>
        <div><b>{d.name}</b><p>{d.topic}</p></div>
        <span className="monti-div-track">{d.track}</span>
      </li>)}</ol>
    </div>

    <details className="monti-source">
      <summary>数据口径与边界说明 ↗</summary>
      <p>核查于 2026.11.01，通过小红书站内搜索与主页核对 6 个账号。粉丝与「获赞与收藏」直接取自主页，均为简单加总、未去重用户。中位数取主页默认顺序前 10 条非置顶笔记。评论数含作者回复，不等于独立客户或有效线索。</p>
      <p>本次没有后台曝光、私信、预约、成交或投流数据，因此未计算互动率、转化率或获客成本，也未判断销售成绩。账号「曾由我管理」来自我的说明；若用于业绩，需补充管理起止时间、当期后台数据与我实际负责的动作。产品材质与工艺描述来自账号自述，未作商品鉴定。</p>
      <a href={reportUrl} target="_blank" rel="noopener noreferrer">查看完整核查报告 ↗</a>
    </details>
  </section>;
}
