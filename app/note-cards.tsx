import { assetPath } from "./asset-path";

const notes = [
  {
    "href": "https://xhslink.cn/o/5K2l3IjfczA",
    "title": "艺术生云南8⃣️天旅游穿搭合集（附🔗",
    "cover": "/note-covers/note-1.jpg",
    "author": "椰奶没喝饱_",
    "type": "normal",
    "width": 1920,
    "height": 2560
  },
  {
    "href": "https://xhslink.cn/o/304rUVT5FUg",
    "title": "黑色夹克➕透视内搭➕低腰工装裤真的好辣🥵",
    "cover": "/note-covers/note-2.jpg",
    "author": "椰奶没喝饱_",
    "type": "normal",
    "width": 1440,
    "height": 1920
  },
  {
    "href": "https://xhslink.cn/o/AMX4gDLpkzf",
    "title": "9⃣️套look春日早八韩系学院风套装合集（附🔗",
    "cover": "/note-covers/note-3.jpg",
    "author": "椰奶没喝饱_",
    "type": "normal",
    "width": 1920,
    "height": 2560
  },
  {
    "href": "https://xhslink.cn/o/2rejZlqDkbz",
    "title": "早秋姐系风衣穿搭🍂温柔慵懒气质大姐姐～🤎",
    "cover": "/note-covers/note-4.jpg",
    "author": "椰奶没喝饱_",
    "type": "video",
    "width": 1290,
    "height": 1720
  },
  {
    "href": "https://xhslink.cn/o/6ozW7w8dYis",
    "title": "高智感姐系大衣穿搭‼️气质清冷韩剧大女主🖤",
    "cover": "/note-covers/note-5.jpg",
    "author": "椰奶没喝饱_",
    "type": "normal",
    "width": 3668,
    "height": 4890
  }
];

export function NoteCards() {
 return <section className="selected-notes" id="selected-notes" aria-labelledby="notes-title">
  <div className="notes-heading"><h4 id="notes-title">五条代表内容</h4><span>点击封面，打开小红书笔记 ↗</span></div>
  <div className="note-card-grid">{notes.map(note => <a className="note-card" href={note.href} target="_blank" rel="noopener noreferrer" key={note.href} aria-label={`在小红书打开：${note.title}`}>
   <div className="note-cover"><img src={assetPath(note.cover)} alt={note.title} width={note.width} height={note.height} loading="lazy"/>{note.type === "video" && <span className="note-video" aria-label="视频笔记">▶</span>}</div>
   <div className="note-card-copy"><h5 title={note.title}>{note.title}</h5><div className="note-card-footer"><span className="note-author"><img src={assetPath("/note-covers/avatar.jpg")} alt="" width={22} height={22}/><span>{note.author}</span></span><span className="note-open" aria-hidden="true">↗</span></div></div>
  </a>)}</div>
 </section>;
}
