"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_components_node_1 = require("pip-services3-components-node");
const TagsNullClientV1_1 = require("../version1/TagsNullClientV1");
const TagsDirectClientV1_1 = require("../version1/TagsDirectClientV1");
const TagsHttpClientV1_1 = require("../version1/TagsHttpClientV1");
class TagsClientFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(TagsClientFactory.NullClientV1Descriptor, TagsNullClientV1_1.TagsNullClientV1);
        this.registerAsType(TagsClientFactory.DirectClientV1Descriptor, TagsDirectClientV1_1.TagsDirectClientV1);
        this.registerAsType(TagsClientFactory.HttpClientV1Descriptor, TagsHttpClientV1_1.TagsHttpClientV1);
    }
}
TagsClientFactory.Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-tags', 'factory', 'default', 'default', '1.0');
TagsClientFactory.NullClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-tags', 'client', 'null', 'default', '1.0');
TagsClientFactory.DirectClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-tags', 'client', 'direct', 'default', '1.0');
TagsClientFactory.HttpClientV1Descriptor = new pip_services3_commons_node_1.Descriptor('pip-services-tags', 'client', 'http', 'default', '1.0');
exports.TagsClientFactory = TagsClientFactory;
//# sourceMappingURL=TagsClientFactory.js.map