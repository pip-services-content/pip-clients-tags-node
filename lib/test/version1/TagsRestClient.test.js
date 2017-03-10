"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var TagsMemoryPersistence = require('pip-services-tags/lib/src/persistence/TagsMemoryPersistence').TagsMemoryPersistence;
var TagsController = require('pip-services-tags/lib/src/logic/TagsController').TagsController;
var TagsRestService = require('pip-services-tags/lib/src/services/version1/TagsRestService').TagsRestService;
var TagsRestClient_1 = require('../../src/version1/TagsRestClient');
var TagsClientFixture_1 = require('./TagsClientFixture');
var restConfig = pip_services_runtime_node_2.ComponentConfig.fromTuples('endpoint.protocol', 'http', 'endpoint.host', 'localhost', 'endpoint.port', 3000);
suite('TagsRestClient', function () {
    var seneca;
    var db = new TagsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new TagsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new TagsRestService();
    service.configure(restConfig);
    var client = new TagsRestClient_1.TagsRestClient();
    client.configure(restConfig);
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, client, service);
    var fixture = new TagsClientFixture_1.TagsClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.close(components, done);
    });
    setup(function (done) {
        db.clearTestData(done);
    });
    test('Get and Set Tags', function (done) {
        fixture.testGetAndSetTags(done);
    });
    test('Record Tags', function (done) {
        fixture.testRecordTags(done);
    });
});
