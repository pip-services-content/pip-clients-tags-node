"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require('lodash');
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var TagsSenecaClient = (function (_super) {
    __extends(TagsSenecaClient, _super);
    function TagsSenecaClient(config) {
        _super.call(this, TagsSenecaClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    TagsSenecaClient.prototype.getTags = function (correlationId, partyId, callback) {
        callback = this.instrument(correlationId, 'tags.get_tags', callback);
        this.call('tags', 'get_tags', {
            correlation_id: correlationId,
            party_id: partyId
        }, callback);
    };
    TagsSenecaClient.prototype.setTags = function (correlationId, partyId, tagRecords, callback) {
        callback = this.instrument(correlationId, 'tags.set_tags', callback);
        this.call('tags', 'set_tags', {
            correlation_id: correlationId,
            party_id: partyId,
            tags: tagRecords
        }, callback);
    };
    TagsSenecaClient.prototype.recordTags = function (correlationId, partyId, tags, callback) {
        callback = this.instrument(correlationId, 'tags.record_tags', callback);
        this.call('tags', 'record_tags', {
            correlation_id: correlationId,
            party_id: partyId,
            tags: tags
        }, callback);
    };
    /**
     * Unique descriptor for the TagsSenecaClient component
     */
    TagsSenecaClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-tags", "seneca", "1.0");
    return TagsSenecaClient;
}(pip_services_runtime_node_5.SenecaClient));
exports.TagsSenecaClient = TagsSenecaClient;
