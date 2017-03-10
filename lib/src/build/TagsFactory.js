"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var pip_services_runtime_node_1 = require('pip-services-runtime-node');
var pip_services_runtime_node_2 = require('pip-services-runtime-node');
var Version1 = require('../version1');
var TagsFactory = (function (_super) {
    __extends(TagsFactory, _super);
    function TagsFactory() {
        _super.call(this, pip_services_runtime_node_2.DefaultFactory.Instance);
        this.register(Version1.TagsNullClient.Descriptor, Version1.TagsNullClient);
        this.register(Version1.TagsRestClient.Descriptor, Version1.TagsRestClient);
        this.register(Version1.TagsSenecaClient.Descriptor, Version1.TagsSenecaClient);
        this.register(Version1.TagsLambdaClient.Descriptor, Version1.TagsLambdaClient);
    }
    TagsFactory.Instance = new TagsFactory();
    return TagsFactory;
}(pip_services_runtime_node_1.ComponentFactory));
exports.TagsFactory = TagsFactory;
