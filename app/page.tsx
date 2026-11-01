import { YenaiIntro } from './yenai-intro';
import { PortfolioCover, Contact } from './portfolio-content';
import { ModuleDirectory } from './module-directory';
import { PortfolioHeader } from './module-shell';
import { PortfolioInteractions } from './portfolio-interactions';
import { LegacyChapters } from './legacy-chapters';
export default function Home(){return <><LegacyChapters/><YenaiIntro/><noscript><style>{'.yenai-intro{display:none}'}</style></noscript><PortfolioInteractions chapters={[{id:'modules',label:'作品目录'},{id:'contact',label:'联系我'}]} dock={false}/><a className="skip-link" href="#main">跳到主要内容</a><div className="site-canvas portfolio-home" id="top"><PortfolioHeader/><main id="main"><PortfolioCover/><ModuleDirectory/><Contact/></main></div></>;}
