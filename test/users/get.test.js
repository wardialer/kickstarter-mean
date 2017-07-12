const test = require('ava');
const sinon = require('sinon');
const libs = require('../../app/libs/users');
const User = require('../../app/models/user');

test.cb.before((t) => {
    sinon.stub(User, 'find');
    t.end();
});

test.cb('should get all requested users', (t) => {
    const a = { name: 'a' };
    const b = { name: 'b' };
    const expectedModels = [a, b];
    const params = '123456789';

    User.find.yields(null, expectedModels);

    libs.get(params)
        .then((data) => {
            t.is(data, expectedModels);
            t.end();
        })
        .catch((error) => {
            t.fail(error);
            t.end();
        });
    sinon.assert.calledWith(User.find, { _id: params });
});

test.cb('get method should fail in case of errors', (t) => {
    User.find.yields('unrecoverable failure!', null);

    libs.get({})
        .then((data) => {
            t.fail(data);
            t.end();
        })
        .catch((error) => {
            t.pass(error);
            t.end();
        });

    sinon.assert.calledWith(User.find, { _id: {} });
});

test.after.cb((t) => {
    User.find.restore();
    t.end();
});
