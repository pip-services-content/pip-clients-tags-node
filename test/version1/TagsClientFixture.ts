let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { ITagsClient } from '../../src/version1/ITagsClient';

let TAGS = [
    { tag: 'tag1', count: 10, used: new Date() },
    { tag: 'Tag 2', count: 3, used: new Date() },
    { tag: 'TAG3', count: 4, used: new Date() }
];

export class TagsClientFixture {
    private _client: ITagsClient;
    
    constructor(client: ITagsClient) {
        this._client = client;
    }

    testGetAndSetTags(done) {
        async.series([
        // Update party tags
            (callback) => {
                this._client.setTags(
                    null,
                    '1',
                    TAGS,
                    (err, tags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(tags, 3);

                        callback();
                    }
                );
            },
        // Read and check party tags
            (callback) => {
                this._client.getTags(
                    null,
                    '1',
                    (err, tags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(tags, 3);

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
                    (err, tags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(tags, 3);

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
                    (err, tags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(tags, 4);

                        callback(err);
                    }
                );
            },
        // Get tags
            (callback) => {
                this._client.getTags(
                    null,
                    '1',
                    (err, tags) => {
                        assert.isNull(err);
                        
                        assert.lengthOf(tags, 4);

                        callback(err);
                    });
            },
        ], done);
    }
        
}
