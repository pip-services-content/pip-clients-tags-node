let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';
import { SenecaAddon } from 'pip-services-runtime-node';

let TagsMemoryPersistence = require('pip-services-tags/lib/src/persistence/TagsMemoryPersistence').TagsMemoryPersistence;
let TagsController = require('pip-services-tags/lib/src/logic/TagsController').TagsController;
let TagsSenecaService = require('pip-services-tags/lib/src/services/version1/TagsSenecaService').TagsSenecaService;

import { TagsSenecaClient } from '../../src/version1/TagsSenecaClient';
import { TagsClientFixture } from './TagsClientFixture';

suite('TagsSenecaClient', ()=> {        
    let db = new TagsMemoryPersistence();
    db.configure(new ComponentConfig());

    let ctrl = new TagsController();
    ctrl.configure(new ComponentConfig());

    let service = new TagsSenecaService();
    service.configure(new ComponentConfig());

    let client = new TagsSenecaClient();
    client.configure(new ComponentConfig());

    let seneca = new SenecaAddon();
    seneca.configure(new ComponentConfig());

    let components = ComponentSet.fromComponents(db, ctrl, client, service, seneca);
    let fixture = new TagsClientFixture(client);

    suiteSetup((done) => {
        LifeCycleManager.linkAndOpen(components, done);
    });
    
    suiteTeardown((done) => {
        seneca.getSeneca().close(() => {
            LifeCycleManager.close(components, done);
        });
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