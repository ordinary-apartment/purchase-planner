(function(root){
'use strict';
const month=(year,mon)=>Number(year)*12+Number(mon)-1;
const parts=index=>({year:Math.floor(index/12),month:index%12+1});
const label=index=>{const p=parts(index);return `${p.year}年${p.month}月`};
const valid=p=> typeof p.name==='string'&&Number.isSafeInteger(p.price)&&p.price>=0&&p.price<=1000000000000&&Number.isInteger(p.year)&&p.year>=1900&&p.year<=2200&&Number.isInteger(p.month)&&p.month>=1&&p.month<=12&&Number.isInteger(p.loan)&&p.loan>=1&&p.loan<=1200&&Number.isInteger(p.use)&&p.use>=1&&p.use<=1200;
const payment=(p,index)=>{if(!valid(p))return 0;const offset=index-month(p.year,p.month);if(offset<0||offset>=p.loan)return 0;const base=Math.floor(p.price/p.loan);return offset===p.loan-1?p.price-base*(p.loan-1):base};
const dates=p=>({start:month(p.year,p.month),loanEnd:month(p.year,p.month)+p.loan-1,useEnd:month(p.year,p.month)+p.use-1,replacement:month(p.year,p.month)+p.use});
const total=(items,index)=>items.reduce((sum,p)=>sum+payment(p,index),0);
const api={month,parts,label,valid,payment,dates,total};root.Planner=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
