"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class TagsDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor("pip-services-tags", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getTags(correlationId, partyId, callback) {
        let timing = this.instrument(correlationId, 'tags.get_tags');
        this._controller.getTags(correlationId, partyId, (err, partyTags) => {
            timing.endTiming();
            callback(err, partyTags);
        });
    }
    setTags(correlationId, partyTags, callback) {
        let timing = this.instrument(correlationId, 'tags.set_tags');
        this._controller.setTags(correlationId, partyTags, (err, partyTags) => {
            timing.endTiming();
            callback(err, partyTags);
        });
    }
    recordTags(correlationId, partyId, tags, callback) {
        let timing = this.instrument(correlationId, 'tags.record_tags');
        this._controller.recordTags(correlationId, partyId, tags, (err, partyTags) => {
            timing.endTiming();
            callback(err, partyTags);
        });
    }
}
exports.TagsDirectClientV1 = TagsDirectClientV1;
//# sourceMappingURL=TagsDirectClientV1.js.map