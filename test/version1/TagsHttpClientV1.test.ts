let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';

import { TagsMemoryPersistence } from 'pip-services-Tags-node';
import { TagsController } from 'pip-services-Tags-node';
import { TagsHttpServiceV1 } from 'pip-services-Tags-node';
import { ITagsClientV1 } from '../../src/version1/ITagsClientV1';
import { TagsHttpClientV1 } from '../../src/version1/TagsHttpClientV1';
import { TagsClientFixtureV1 } from './TagsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('TagsHttpClientV1', ()=> {
    let persistence: TagsMemoryPersistence;
    let service: TagsHttpServiceV1;
    let client: TagsHttpClientV1;
    let fixture: TagsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        persistence = new TagsMemoryPersistence();
        let controller = new TagsController();

        service = new TagsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-tags', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-tags', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-tags', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new TagsHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new TagsClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });
    
    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
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
