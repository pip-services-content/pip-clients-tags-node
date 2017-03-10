let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

let TagsMemoryPersistence = require('pip-services-tags/lib/src/persistence/TagsMemoryPersistence').TagsMemoryPersistence;
let TagsController = require('pip-services-tags/lib/src/logic/TagsController').TagsController;
let TagsRestService = require('pip-services-tags/lib/src/services/version1/TagsRestService').TagsRestService;

import { TagsRestClient } from '../../src/version1/TagsRestClient';
import { TagsClientFixture } from './TagsClientFixture';

let restConfig = ComponentConfig.fromTuples(
    'endpoint.protocol', 'http',
    'endpoint.host', 'localhost',
    'endpoint.port', 3000
);

suite('TagsRestClient', ()=> {    
    let db = new TagsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new TagsController();
    ctrl.configure(new ComponentConfig());

    let service = new TagsRestService();
    service.configure(restConfig);

    let client = new TagsRestClient();
    client.configure(restConfig);

    let components = ComponentSet.fromComponents(db, ctrl, client, service);
    let fixture = new TagsClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        LifeCycleManager.close(components, done);
    });
    
    setup((done) => {
        db.clearTestData(done);
    });
    
    test('Get and Set Tags', (done) => {
        fixture.testGetAndSetTags(done);
    });

    test('Record Tags', (done) => {
        fixture.testRecordTags(done);
    });
});