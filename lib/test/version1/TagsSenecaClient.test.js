"use strict";
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var TagsMemoryPersistence = require('pip-services-tags/lib/src/persistence/TagsMemoryPersistence').TagsMemoryPersistence;
var TagsController = require('pip-services-tags/lib/src/logic/TagsController').TagsController;
var TagsSenecaService = require('pip-services-tags/lib/src/services/version1/TagsSenecaService').TagsSenecaService;
var TagsSenecaClient_1 = require('../../src/version1/TagsSenecaClient');
var TagsClientFixture_1 = require('./TagsClientFixture');
suite('TagsSenecaClient', function () {
    var db = new TagsMemoryPersistence();
    db.configure(new pip_services_runtime_node_2.ComponentConfig());
    var ctrl = new TagsController();
    ctrl.configure(new pip_services_runtime_node_2.ComponentConfig());
    var service = new TagsSenecaService();
    service.configure(new pip_services_runtime_node_2.ComponentConfig());
    var client = new TagsSenecaClient_1.TagsSenecaClient();
    client.configure(new pip_services_runtime_node_2.ComponentConfig());
    var seneca = new pip_services_runtime_node_4.SenecaAddon();
    seneca.configure(new pip_services_runtime_node_2.ComponentConfig());
    var components = pip_services_runtime_node_1.ComponentSet.fromComponents(db, ctrl, client, service, seneca);
    var fixture = new TagsClientFixture_1.TagsClientFixture(client);
    suiteSetup(function (done) {
        pip_services_runtime_node_3.LifeCycleManager.linkAndOpen(components, done);
    });
    suiteTeardown(function (done) {
        seneca.getSeneca().close(function () {
            pip_services_runtime_node_3.LifeCycleManager.close(components, done);
        });
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
