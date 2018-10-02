import { Objects } from './objects';
import { IContainer } from '../model/IContainer';

import { expect } from 'chai';
import 'mocha';

describe ('Objects Specmate', () => {
   it('if both objects are undefined return udefined', () => {
       const o1: IContainer = { ___nsuri:'', url: '', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' };
       const o2: IContainer = undefined;
       expect(Objects.changedFields(o1, o2)).to.be.undefined;
     });
   it('if the objects type is differnt throw an new error', () => {
       const o1: IContainer = { ___nsuri:'', url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' };
       const o2 = { name: 'd' };
       expect(function () {Objects.changedFields(o1, o2); })
       .to.throw(new Error ('Types do not match! Tried to get changed fields from unmatching types.'));
   });
   it('if the objects has the changed fields return array', () => {
       const o1: IContainer = { ___nsuri:'', url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' };
       const o2: IContainer = { ___nsuri:'', url: '12', className: 'string', id : '2', name : 'weeds', description : 'this is weeds' };
       expect(Objects.changedFields(o1, o2)).to.equal(['id']);
   });
   it('if the objects has the different length in array return changeField', () => {
       const o1 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds', lines: ['x', 'y', 'z'] };
       const o2 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' , lines: ['x', 'y']};
       expect(Objects.changedFields(o1, o2)).to.equal(['lines']);
   });
   it('if the objects has the same length in array but different value return changeField', () => {
       const o1 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds', lines: ['x', 'z']};
       const o2 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' , lines: ['x', 'y']};
       expect(Objects.changedFields(o1, o2)).to.equal(['lines']);
   });
   it('if the objects has the different properties/fields in o2 return changeField', () => {
       const o1 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' };
       const o2 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' , lines: ['x', 'y']};
       expect(Objects.changedFields(o1, o2)).to.equal(['lines']);
   });
   it('if the objects has the different properties/fields in o1 return changeField', () => {
       const o1 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' , weight : 's'};
       const o2 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' };
       expect(Objects.changedFields(o1, o2)).to.equal(['weight']);
   });
});
