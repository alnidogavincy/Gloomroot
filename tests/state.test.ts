import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fresh,decode,canAttack,canHurt,canJump,checkpointSnapshot} from '../src/state.ts';
test('corrupt and incompatible saves recover safely',()=>{assert.deepEqual(decode('{bad'),fresh());assert.deepEqual(decode('{"version":2}'),fresh());assert.equal(decode('{"version":1,"checkpoint":99}').checkpoint,0);});
test('validate and deduplicate altar progress',()=>{assert.deepEqual(decode('{"version":1,"altars":[0,0,4,"1",1]}').altars,[0,1]);});
test('attack and immunity boundaries',()=>{assert.equal(canAttack(459,0),false);assert.equal(canAttack(460,0),true);assert.equal(canHurt(1299,0),false);assert.equal(canHurt(1300,0),true);});
test('jump buffering and coyote window both required',()=>{assert.equal(canJump(1000,900,870),true);assert.equal(canJump(1000,879,990),false);assert.equal(canJump(1000,990,859),false);});
test('checkpoint retains earned altars and drops future progress',()=>{const saved=checkpointSnapshot({...fresh(),altars:[0,1,2]},2);assert.deepEqual(saved.altars,[0,1]);assert.equal(saved.checkpoint,2);assert.equal(saved.started,true);});
