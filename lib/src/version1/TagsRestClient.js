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
var TagsRestClient = (function (_super) {
    __extends(TagsRestClient, _super);
    function TagsRestClient(config) {
        _super.call(this, TagsRestClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    TagsRestClient.prototype.getTags = function (correlationId, partyId, callback) {
        callback = this.instrument(correlationId, 'tags.get_tags', callback);
        this.call('get', '/tags/' + partyId, {
            correlation_id: correlationId
        }, callback);
    };
    TagsRestClient.prototype.setTags = function (correlationId, partyId, tagRecords, callback) {
        callback = this.instrument(correlationId, 'tags.set_tags', callback);
        this.call('put', '/tags/' + partyId, {
            correlation_id: correlationId
        }, {
            tags: tagRecords
        }, callback);
    };
    TagsRestClient.prototype.recordTags = function (correlationId, partyId, tags, callback) {
        callback = this.instrument(correlationId, 'tags.record_tags', callback);
        this.call('post', '/tags/' + partyId, {
            correlation_id: correlationId
        }, {
            tags: tags
        }, callback);
    };
    /**
     * Unique descriptor for the TagsRestClient component
     */
    TagsRestClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-tags", "rest", "1.0");
    return TagsRestClient;
}(pip_services_runtime_node_5.RestClient));
exports.TagsRestClient = TagsRestClient;
