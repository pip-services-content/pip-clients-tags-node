let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { TagsMemoryPersistence } from 'pip-services-tags-node';
import { TagsController } from 'pip-services-tags-node';
import { TagsSenecaServiceV1 } from 'pip-services-tags-node';
import { ITagsClientV1 } from '../../src/version1/ITagsClientV1';
import { TagsSenecaClientV1 } from '../../src/version1/TagsSenecaClientV1';
import { TagsClientFixtureV1 } from './TagsClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('TagsSenecaClient', () => {
    let persistence: TagsMemoryPersistence;
    let service: TagsSenecaServiceV1;
    let client: TagsSenecaClientV1;
    let fixture: TagsClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        persistence = new TagsMemoryPersistence();
        let controller = new TagsController();

        service = new TagsSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-tags', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-tags', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-tags', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new TagsSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

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
