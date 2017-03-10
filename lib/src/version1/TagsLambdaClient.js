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
var TagsLambdaClient = (function (_super) {
    __extends(TagsLambdaClient, _super);
    function TagsLambdaClient(config) {
        _super.call(this, TagsLambdaClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    TagsLambdaClient.prototype.getTags = function (correlationId, partyId, callback) {
        callback = this.instrument(correlationId, 'tags.get_tags', callback);
        this.call('get_tags', {
            correlation_id: correlationId,
            party_id: partyId
        }, callback);
    };
    TagsLambdaClient.prototype.setTags = function (correlationId, partyId, tagRecords, callback) {
        callback = this.instrument(correlationId, 'tags.set_tags', callback);
        this.call('set_tags', {
            correlation_id: correlationId,
            party_id: partyId,
            tags: tagRecords
        }, callback);
    };
    TagsLambdaClient.prototype.recordTags = function (correlationId, partyId, tags, callback) {
        callback = this.instrument(correlationId, 'tags.record_tags', callback);
        this.call('record_tags', {
            correlation_id: correlationId,
            party_id: partyId,
            tags: tags
        }, callback);
    };
    /**
     * Unique descriptor for the TagsSenecaClient component
     */
    TagsLambdaClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-tags", "lambda", "1.0");
    return TagsLambdaClient;
}(pip_services_runtime_node_5.LambdaClient));
exports.TagsLambdaClient = TagsLambdaClient;
