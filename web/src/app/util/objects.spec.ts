import { Objects } from './objects';
import { IContainer } from '../model/IContainer';

import { expect } from 'chai';
import 'mocha';

describe('Objects Specmate', () => {
    it('should return undefined if both objects are undefined', () => {
        const o1: IContainer = { ___nsuri: 'string', url: '', className: 'string',
            id : '1', name : 'weeds', description : 'this is weeds' };
        const o2: IContainer = undefined;
        // expect(Objects.changedFields(o1, o2)).to.be.undefined;
    });
    it('should throw an new error if the objects type is differnt', () => {
        const o1: IContainer = { ___nsuri: 'string', url: '12', className: 'string',
            id : '1', name : 'weeds', description : 'this is weeds' };
        const o2 = { name: 'd' };
        expect(function () {Objects.changedFields(o1, o2); })
        .to.throw('Types do not match! Tried to get changed fields from unmatching types.');
    });
    it('should return array if the objects has the changed fields', () => {
        const o1: IContainer = { ___nsuri: 'string', url: '12', className: 'string',
            id : '1', name : 'weeds', description : 'this is weeds' };
        const o2: IContainer = { ___nsuri: 'string', url: '12', className: 'string',
            id : '2', name : 'weeds', description : 'this is weeds' };
        expect(Objects.changedFields(o1, o2)).to.eql([ 'id' ]);
    });
    it('should return changeField if the objects has the different length in array', () => {
        const o1 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds', lines: ['x', 'y', 'z'] };
        const o2 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' , lines: ['x', 'y']};
        expect(Objects.changedFields(o1, o2)).to.eql(['lines']);
    });
    it('should return changeField if the objects has the same length in array but different value', () => {
        const o1 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds', lines: ['x', 'z']};
        const o2 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' , lines: ['x', 'y']};
        expect(Objects.changedFields(o1, o2)).to.eql(['lines']);
    });
    it('should return changeField if the objects has the different properties/fields in o2', () => {
        const o1 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' };
        const o2 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' , lines: ['x', 'y']};
        expect(Objects.changedFields(o1, o2)).to.eql(['lines']);
    });
    it('should return changeField if the objects has the different properties/fields in o1', () => {
        const o1 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' , weight : 's'};
        const o2 = { url: '12', className: 'string', id : '1', name : 'weeds', description : 'this is weeds' };
        expect(Objects.changedFields(o1, o2)).to.eql(['weight']);
    });
});
