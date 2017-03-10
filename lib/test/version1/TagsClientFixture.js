"use strict";
var _ = require('lodash');
var async = require('async');
var assert = require('chai').assert;
var TAGS = [
    { tag: 'tag1', count: 10, used: new Date() },
    { tag: 'Tag 2', count: 3, used: new Date() },
    { tag: 'TAG3', count: 4, used: new Date() }
];
var TagsClientFixture = (function () {
    function TagsClientFixture(client) {
        this._client = client;
    }
    TagsClientFixture.prototype.testGetAndSetTags = function (done) {
        var _this = this;
        async.series([
            // Update party tags
            function (callback) {
                _this._client.setTags(null, '1', TAGS, function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 3);
                    callback();
                });
            },
            // Read and check party tags
            function (callback) {
                _this._client.getTags(null, '1', function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 3);
                    callback();
                });
            }
        ], done);
    };
    TagsClientFixture.prototype.testRecordTags = function (done) {
        var _this = this;
        async.series([
            // Record tags first time
            function (callback) {
                _this._client.recordTags(null, '1', ['tag1', 'tag 2', 'tag_3'], function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 3);
                    callback(err);
                });
            },
            // Record tags second time
            function (callback) {
                _this._client.recordTags(null, '1', ['TAG2', 'tag3', 'tag__4'], function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 4);
                    callback(err);
                });
            },
            // Get tags
            function (callback) {
                _this._client.getTags(null, '1', function (err, tags) {
                    assert.isNull(err);
                    assert.lengthOf(tags, 4);
                    callback(err);
                });
            },
        ], done);
    };
    return TagsClientFixture;
}());
exports.TagsClientFixture = TagsClientFixture;
