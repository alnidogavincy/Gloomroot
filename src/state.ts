export type Save = {version:1;checkpoint:number;altars:number[];completed:boolean;started:boolean;sound:boolean;low:boolean};
export const fresh=():Save=>({version:1,checkpoint:0,altars:[],completed:false,started:false,sound:true,low:false});
export function decode(raw:string|null):Save {try{const v=JSON.parse(raw||'null');if(v?.version!==1)return fresh();return {...fresh(),checkpoint:[0,1,2].includes(v.checkpoint)?v.checkpoint:0,altars:Array.isArray(v.altars)?[...new Set<number>(v.altars.filter((n:unknown)=>n===0||n===1||n===2))]:[],completed:v.completed===true,started:v.started===true,sound:v.sound!==false,low:v.low===true};}catch{return fresh();}}
export function canAttack(now:number,last:number){return now-last>=460;}
export function canHurt(now:number,last:number){return now-last>=1300;}
export function canJump(now:number,groundedAt:number,requestedAt:number){return now-groundedAt<=120&&now-requestedAt<=140;}
export function checkpointSnapshot(s:Save,index:number):Save{return {...s,checkpoint:index,altars:s.altars.filter(n=>n<index),started:true};}
