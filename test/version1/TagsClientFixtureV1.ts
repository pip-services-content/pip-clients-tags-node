let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { TagRecordV1 } from '../../src/version1/TagRecordV1';
import { PartyTagsV1 } from '../../src/version1/PartyTagsV1';
import { ITagsClientV1 } from '../../src/version1/ITagsClientV1';

let TAGS = new PartyTagsV1(
    '1', 
    [
        new TagRecordV1('tag1', 10),
        new TagRecordV1('Tag 2', 3),
        new TagRecordV1('TAG3', 4)
    ]
);

export class TagsClientFixtureV1 {
    private _client: ITagsClientV1;
    
    constructor(client: ITagsClientV1) {
        this._client = client;
    }

    testGetAndSetTags(done) {
        async.series([
        // Update party tags
            (callback) => {
                this._client.setTags(
                    null,
                    TAGS,
                    (err, partyTags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(partyTags.tags, 3);

                        callback();
                    }
                );
            },
        // Read and check party tags
            (callback) => {
                this._client.getTags(
                    null,
                    '1',
                    (err, partyTags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(partyTags.tags, 3);

                        callback();
                    }
                );
            }
        ], done);
    }

    testRecordTags(done) {
        async.series([
        // Record tags first time
            (callback) => {
                this._client.recordTags(
                    null,
                    '1',
                    ['tag1', 'tag 2', 'tag_3'],
                    (err, partyTags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(partyTags.tags, 3);

                        callback(err);
                    }
                );
            },
        // Record tags second time
            (callback) => {
                this._client.recordTags(
                    null,
                    '1',
                    ['TAG2', 'tag3', 'tag__4'],
                    (err, partyTags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(partyTags.tags, 4);

                        callback(err);
                    }
                );
            },
        // Get tags
            (callback) => {
                this._client.getTags(
                    null,
                    '1',
                    (err, partyTags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(partyTags.tags, 4);

                        callback(err);
                    });
            },
        ], done);
    }
        
}
