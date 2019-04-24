"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
class TagsLambdaClientV1 extends pip_services3_aws_node_1.CommandableLambdaClient {
    constructor(config) {
        super('tags');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
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
exports.TagsLambdaClientV1 = TagsLambdaClientV1;
//# sourceMappingURL=TagsLambdaClientV1.js.map