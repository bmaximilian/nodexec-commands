/**
 * Created on 01.09.18.
 *
 * @author Maximilian Beck <maximilian.beck@wtl.de>
 */

const { describe, it } = require('mocha');
const { expect } = require('chai');

describe('example', () => {
    it('Should add 1+1', () => {
        expect(1 + 1).to.equal(2);
    });
});
