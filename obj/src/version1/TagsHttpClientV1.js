"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let os = require('os');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class TagsHttpClientV1 extends pip_services_net_node_1.CommandableHttpClient {
    constructor(config) {
        super('tags');
        if (config != null)
            this.configure(pip_services_commons_node_1.ConfigParams.fromValue(config));
    }
    getTags(correlationId, partyId, callback) {
        this.callCommand('get_tags', correlationId, {
            party_id: partyId
        }, callback);
    }
    setTags(correlationId, partyTags, callback) {
        this.callCommand('set_tags', correlationId, {
            party_tags: partyTags
        }, callback);
    }
    recordTags(correlationId, partyId, tags, callback) {
        this.callCommand('record_tags', correlationId, {
            party_id: partyId,
            tags: tags
        }, callback);
    }
}
exports.TagsHttpClientV1 = TagsHttpClientV1;
//# sourceMappingURL=TagsHttpClientV1.js.map