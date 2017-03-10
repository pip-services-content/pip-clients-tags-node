# Client API (version 1) <br/> Tags Microservices Client SDK for Node.js

Node.js client API for Tags microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [Tag class](#class1)
* [ITagsClient interface](#interface)
    - [init()](#operation1)
    - [open()](#operation2)
    - [close()](#operation3)
    - [getTags()](#operation4)
    - [setTags()](#operation5)
    - [recordTags()](#operation6)
* [TagsRestClient class](#client_rest)
* [TagsSenecaClient class](#client_seneca)
* [TagsNullClient class](#client_null)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-tags-node": "git+ssh://git@github.com:pip-services/pip-clients-tags-node.git",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

If you are using Typescript, add the following type definition where compiler can find it
```javascript
/// <reference path="../node_modules/pip-clients-tags-node/module.d.ts" />
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-tags-node').Version1;

// Client configuration
var config = {
    transport: {
        type: 'http',
        host: 'localhost', 
        port: 8012
    }
};

// Create the client instance
var client = sdk.TagsRestClient(config);

// Open client connection to the microservice
client.open(function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
    
    // Record tags
    client.recordTags(
        '123',
        ['draft', 'important'], 
        function (err, tags) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Tag usage history is');
            console.log(tags);
            
            // Read tags usage history
            client.getTags(
                '123',
                function (err, tags) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('tags usage history is');
                    console.log(tags);
                    
                    // Close connection
                    client.close(); 
                }
            );
        }
    );
});
```

## <a name="class1"></a> Tag class

Represents a record of specific tag usage by the party

**Properties:**
- tag: string - a tag string
- count: number - how manu times the tag was used
- used: Date - date and time when the tag used for the last time

## <a name="interface"></a> ITagsClient interface

If you are using Typescript, you can use ITagsClient as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about ITagsClient. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface ITagsClient {
    init(refs);
    open(callback);
    close(callback);
    getTags(partyId, callback);
    setTags(partyId, tagRecords, callback);
    recordTags(partyId, tags, callback);
}
```

### <a name="operation1"></a> init(refs)

Initializes client references. This method is optional. It is used to set references 
to logger or performance counters.

**Arguments:**
- refs: References - references to other components 
  - log: ILog - reference to logger
  - countes: ICounters - reference to performance counters

### <a name="operation2"></a> open(callback)

Opens connection to the microservice

**Arguments:**
- callback: (err) => null - callback function
  - err - Error or null is no error occured

### <a name="operation3"></a> close(callback)

Closes connection to the microservice

**Arguments:**
- callback: (err) => null - callback function
  - err - Error or null is no error occured

### <a name="operation4"></a> getTags(partyId, callback)

Retrieves tags usage history for specified party

**Arguments:** 
- partyId: string - unique party id
- callback: (err, tagRecords) => void - callback function
  - err: Error - occured error or null for success
  - tagRecords: [Tag] - history of tags used by the party

### <a name="operation5"></a> setTags(partyId, tagRecords, callback)

Sets tags usage history for the specified party

**Arguments:** 
- partyId: string - unique party id
- tagRecords: [Tag] - history of tags to be stored for the party
- callback: (err, tagRecords) => void - callback function
  - err: Error - occured error or null for success
  - tagRecords: [Tag] - updated history of tags used by the party

### <a name="operation6"></a> recordTags(partyId, tags, callback)

Records single instance of tags usage and updates the tags history.

**Arguments:** 
- partyId: string - unique party id
- tags: [string] - tags used by the party to be added to the history
- callback: (err, tagRecords) => void - callback function
  - err: Error - occured error or null for success
  - tagRecords: [Tag] - updated history of tags used by the party
 
## <a name="client_rest"></a> TagsRestClient class

TagsRestClient is a client that implements HTTP/REST protocol

```javascript
class TagsRestClient extends RestClient implements ITagsClient {
    constructor(config?: any);
    init(refs);
    open(callback);
    close(callback);
    getTags(partyId, callback);
    setTags(partyId, tagRecords, callback);
    recordTags(partyId, tags, callback);
}
```

**Constructor config properties:** 
- transport: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> TagsSenecaClient class

TagsSenecaClient is a client that implements Seneca protocol

```javascript
class TagsSenecaClient extends SenecaClient implements ITagsClient {
    constructor(config?: any);        
    init(refs);
    open(callback);
    close(callback);
    getTags(partyId, callback);
    setTags(partyId, tagRecords, callback);
    recordTags(partyId, tags, callback);
}
```

**Constructor config properties:** 
- transport: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_null"></a> TagsNullClient class

TagsNullClient is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```javascript
class TagsNullClient extends AbstractClient implements ITagsClient {
    constructor();        
    init(refs);
    open(callback);
    close(callback);
    getTags(partyId, callback);
    setTags(partyId, tagRecords, callback);
    recordTags(partyId, tags, callback);
}
```
