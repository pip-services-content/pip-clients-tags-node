"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const TagsNullClientV1_1 = require("../version1/TagsNullClientV1");
const TagsDirectClientV1_1 = require("../version1/TagsDirectClientV1");
const TagsHttpClientV1_1 = require("../version1/TagsHttpClientV1");
const TagsSenecaClientV1_1 = require("../version1/TagsSenecaClientV1");
class TagsFactory extends pip_services_commons_node_2.Factory {
    constructor() {
        super();
        this.registerAsType(TagsFactory.NullClientV1Descriptor, TagsNullClientV1_1.TagsNullClientV1);
        this.registerAsType(TagsFactory.DirectClientV1Descriptor, TagsDirectClientV1_1.TagsDirectClientV1);
        this.registerAsType(TagsFactory.HttpClientV1Descriptor, TagsHttpClientV1_1.TagsHttpClientV1);
        this.registerAsType(TagsFactory.SenecaClientV1Descriptor, TagsSenecaClientV1_1.TagsSenecaClientV1);
    }
}
TagsFactory.Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-tags', 'factory', 'default', 'default', '1.0');
TagsFactory.NullClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-tags', 'client', 'null', 'default', '1.0');
TagsFactory.DirectClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-tags', 'client', 'direct', 'default', '1.0');
TagsFactory.HttpClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-tags', 'client', 'http', 'default', '1.0');
TagsFactory.SenecaClientV1Descriptor = new pip_services_commons_node_1.Descriptor('pip-services-tags', 'client', 'seneca', 'default', '1.0');
exports.TagsFactory = TagsFactory;
//# sourceMappingURL=TagsFactory.js.map