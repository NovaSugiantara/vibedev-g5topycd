function calcTotal(skeins){return skeins.reduce((s,v)=>s+(v.yards*v.count),0)}
function calcDiff(avail,target){return target===''||target===null?null:avail-target}
function fmtDiff(d){return d===null?'\u2014':d>=0?'+'+d:''+d}
function getStatus(avail,target,skeinCnt){const d=calcDiff(avail,target);const has=target!==''&&target!==null&&skeinCnt>0
if(!has)return{label:'',color:'var(--color-text-muted)',diffColor:'var(--color-text-muted)',cardStyle:{backgroundColor:'var(--color-paper-card)',boxShadow:'0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)'}}
if(d>=0)return{label:'Enough yarn',color:'var(--color-green)',diffColor:'var(--color-green)',cardStyle:{backgroundColor:'var(--color-green-bg)',borderLeft:'4px solid var(--color-green)'}}
if(d>=-target*0.1)return{label:'Almost enough',color:'var(--color-yellow)',diffColor:'var(--color-yellow)',cardStyle:{backgroundColor:'var(--color-yellow-bg)',borderLeft:'4px solid var(--color-yellow)'}}
return{label:'Need more yarn',color:'var(--color-red)',diffColor:'var(--color-red)',cardStyle:{backgroundColor:'var(--color-red-bg)',borderLeft:'4px solid var(--color-red)'}}}
let nextId=1;let undoTimer=null
const app=Vue.createApp({data(){return{skeins:[],newSkein:{name:'',yards:'',count:''},targetYards:'',editingId:null,editingSkein:{name:'',yards:'',count:''},error:'',editError:'',toast:'',inputStyle:{backgroundColor:'var(--color-paper-card)',borderColor:'var(--color-border)',color:'var(--color-text)'}}},computed:{totalAvailable(){return calcTotal(this.skeins)},difference(){return calcDiff(this.totalAvailable,this.targetYards)},diffDisplay(){return fmtDiff(this.difference)},statusInfo(){return getStatus(this.totalAvailable,this.targetYards,this.skeins.length)}},methods:{addSkein(){this.error='';const n=this.newSkein
if(!n.name||!n.yards||!n.count){this.error='Please fill in all fields to add a skein.';return}
if(n.yards<1||n.count<1){this.error='Yards and count must be at least 1.';return}
this.skeins.push({id:nextId++,name:n.name.trim(),yards:Number(n.yards),count:Number(n.count)});this.newSkein={name:'',yards:'',count:''}},startEdit(s){this.editError='';this.editingId=s.id;this.editingSkein={...s};this.$nextTick(()=>{this.$el.querySelector('[data-ei]')?.focus()})},saveEdit(){this.editError='';const e=this.editingSkein
if(!e.name||!e.yards||!e.count){this.editError='All fields are required.';return}
if(e.yards<1||e.count<1){this.editError='Yards and count must be at least 1.';return}
const i=this.skeins.findIndex(s=>s.id===this.editingId);if(i===-1)return;this.skeins[i]={...e};this.cancelEdit()},cancelEdit(){this.editingId=null;this.editingSkein={name:'',yards:'',count:''};this.editError=''},deleteSkein(id){const i=this.skeins.findIndex(s=>s.id===id);if(i===-1)return;const removed=this.skeins.splice(i,1)[0];if(this.editingId===id)this.cancelEdit()
this.toast='Skein "'+removed.name+'" deleted.';clearTimeout(undoTimer);undoTimer=setTimeout(()=>{this.toast=''},5000);this._lastRemoved=removed},undoDelete(){if(!this._lastRemoved)return;this.skeins.push(this._lastRemoved);this._lastRemoved=null;this.toast='';clearTimeout(undoTimer)},isEditing(id){return this.editingId===id}}});app.mount('#app')