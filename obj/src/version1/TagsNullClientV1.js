"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PartyTagsV1_1 = require("./PartyTagsV1");
class TagsNullClientV1 {
    getTags(correlationId, partyId, callback) {
        callback(null, new PartyTagsV1_1.PartyTagsV1(partyId, []));
    }
    setTags(correlationId, partyTags, callback) {
        if (callback)
            callback(null, partyTags);
    }
    recordTags(correlationId, partyId, tags, callback) {
        if (callback)
            callback(null, new PartyTagsV1_1.PartyTagsV1(partyId, []));
    }
}
exports.TagsNullClientV1 = TagsNullClientV1;
//# sourceMappingURL=TagsNullClientV1.js.map