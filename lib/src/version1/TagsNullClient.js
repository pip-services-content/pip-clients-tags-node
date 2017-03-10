"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var pip_services_runtime_node_3 = require('pip-services-runtime-node');
var pip_services_runtime_node_4 = require('pip-services-runtime-node');
var pip_services_runtime_node_5 = require('pip-services-runtime-node');
var TagsNullClient = (function (_super) {
    __extends(TagsNullClient, _super);
    function TagsNullClient(config) {
        _super.call(this, TagsNullClient.Descriptor);
        if (config != null) {
            this.configure(pip_services_runtime_node_3.ComponentConfig.fromValue(config));
            this.link(new pip_services_runtime_node_4.ComponentSet());
        }
    }
    TagsNullClient.prototype.getTags = function (correlationId, partyId, callback) {
        if (callback)
            callback(null, []);
    };
    TagsNullClient.prototype.setTags = function (correlationId, partyId, tagRecords, callback) {
        if (callback)
            callback(null, tagRecords || []);
    };
    TagsNullClient.prototype.recordTags = function (correlationId, partyId, tags, callback) {
        if (callback)
            callback(null, []);
    };
    /**
     * Unique descriptor for the TagsRestClient component
     */
    TagsNullClient.Descriptor = new pip_services_runtime_node_2.ComponentDescriptor(pip_services_runtime_node_1.Category.Clients, "pip-services-tags", "null", "1.0");
    return TagsNullClient;
}(pip_services_runtime_node_5.AbstractClient));
exports.TagsNullClient = TagsNullClient;
