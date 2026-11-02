import { ModuleShell } from '../module-shell';
import { IpNotebook } from '../ip-notebook';
import { IpCaseContext } from '../ip-case-context';
export const metadata={title:'是亮亮 · 詹依娜的作品集'};
export default function Page(){return <ModuleShell slug="liangliang" chapters={[{id:'liangliang',label:'项目介绍'},{id:'ip-positioning',label:'账号分析'},{id:'ip-selected-work',label:'代表作品'},{id:'ip-breakdown',label:'内容拆解'},{id:'ip-editing-project',label:'剪映工程'}]}><IpNotebook/><IpCaseContext/></ModuleShell>;}
