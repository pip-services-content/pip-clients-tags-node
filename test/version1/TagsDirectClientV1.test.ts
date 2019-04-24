let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { TagsMemoryPersistence } from 'pip-services-tags-node';
import { TagsController } from 'pip-services-tags-node';
import { ITagsClientV1 } from '../../src/version1/ITagsClientV1';
import { TagsDirectClientV1 } from '../../src/version1/TagsDirectClientV1';
import { TagsClientFixtureV1 } from './TagsClientFixtureV1';

suite('TagsDirectClientV1', ()=> {
    let persistence: TagsMemoryPersistence;
    let client: TagsDirectClientV1;
    let fixture: TagsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        persistence = new TagsMemoryPersistence();
        let controller = new TagsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-tags', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-tags', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new TagsDirectClientV1();
        client.setReferences(references);

        fixture = new TagsClientFixtureV1(client);

        client.open(null, done);
    });
    
    suiteTeardown((done) => {
        client.close(null, done);
    });

    setup((done) => {
        persistence.clear(null, done);
    });

    test('Get and Set Tags', (done) => {
        fixture.testGetAndSetTags(done);
    });

    test('Record Tags', (done) => {
        fixture.testRecordTags(done);
    });
});
