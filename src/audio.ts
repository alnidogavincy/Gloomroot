export class Sound {
 context?:AudioContext; master?:GainNode; enabled=true; bed?:GainNode;
 unlock(){if(!this.context){this.context=new AudioContext();this.master=this.context.createGain();this.master.connect(this.context.destination);this.master.gain.value=this.enabled?.16:0;this.bed=this.context.createGain();this.bed.gain.value=.12;this.bed.connect(this.master);[110,164.81,220,261.63].forEach((f,i)=>{const o=this.context!.createOscillator();o.frequency.value=f;o.type='sine';const g=this.context!.createGain();g.gain.value=.25/(i+1);o.connect(g);g.connect(this.bed!);o.start();});}void this.context.resume();}
 set(on:boolean){this.enabled=on;if(this.master)this.master.gain.setTargetAtTime(on?.16:0,this.context!.currentTime,.1);}
 suspend(){void this.context?.suspend();}
 play(kind:'jump'|'attack'|'hit'|'altar'|'win'){if(!this.context||!this.master)return;const c=this.context,o=c.createOscillator(),g=c.createGain();o.type=kind==='hit'?'triangle':'sine';const f={jump:320,attack:680,hit:100,altar:520,win:780}[kind];o.frequency.setValueAtTime(f,c.currentTime);o.frequency.exponentialRampToValueAtTime(kind==='hit'?40:f*1.7,c.currentTime+.2);g.gain.setValueAtTime(.5,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.4);o.connect(g);g.connect(this.master);o.start();o.stop(c.currentTime+.4);}
}
