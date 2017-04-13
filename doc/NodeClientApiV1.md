# Client API (version 1) <br/> Tags Microservices Client SDK for Node.js

Node.js client API for Tags microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [PartyTagsV1 class](#class1)
* [TagRecordV1 class](#class2)
* [ITagsClientV1 interface](#interface)
    - [getTags()](#operation1)
    - [setTags()](#operation2)
    - [recordTags()](#operation3)
* [TagsHttpClientV1 class](#client_http)
* [TagsSenecaClientV1 class](#client_seneca)
* [TagsDirectClientV1 class](#client_direct)
* [TagsNullClientV1 class](#client_null)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-tags-node": "^1.0.*",
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

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
var sdk = new require('pip-clients-tags-node');

// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};

// Create the client instance
var client = sdk.TagsHttpClientV1(config);

// Open client connection to the microservice
client.open(null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
    
    // Record tags
    client.recordTags(
        null,
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
                null,
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

### <a name="class1"></a> PartyTagsV1 class

Contains collection of all recorded tags used by a party

**Properties:**
- id: string - unique party id
- tags: TagRecordV1[] - array with recorded tags
- changed_time: Date - date and time when the tags where changed

### <a name="class2"></a> TagRecordV1 class

Represents a record of specific tag usage by the party

## <a name="interface"></a> ITagsClientV1 interface

If you are using Typescript, you can use ITagsClient as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about ITagsClient. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface ITagsClientV1 {
    getTags(correlationId, partyId, callback);
    setTags(correlationId, partyTags, callback);
    recordTags(correlationId, partyId, tags, callback);
}
```

### <a name="operation1"></a> getTags(correlationId, partyId, callback)

Retrieves tags usage history for specified party

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- partyId: string - unique party id
- callback: (err, tagRecords) => void - callback function
  - err: Error - occured error or null for success
  - result: PartyTagsV1 - object with party id and recorded tags

### <a name="operation2"></a> setTags(correlationId, partyTags, callback)

Sets tags usage history for the specified party

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- partyTags: PartyTagsV1 - object with party id and recorded tags
- callback: (err, tagRecords) => void - callback function
  - err: Error - occured error or null for success
  - result: PartyTagsV1 - object with party id and recorded tags

### <a name="operation3"></a> recordTags(correlationId, partyId, tags, callback)

Records single instance of tags usage and updates the tags history.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- partyId: string - unique party id
- tags: [string] - tags used by the party to be added to the history
- callback: (err, tagRecords) => void - callback function
  - err: Error - occured error or null for success
  - result: PartyTagsV1 - object with party id and recorded tags
 
## <a name="client_rest"></a> TagsHttpClientV1 class

TagsHttpClientV1 is a client that implements HTTP protocol

```javascript
class TagsHttpClientV1 extends CommandableHttpClient implements ITagsClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getTags(correlationId, partyId, callback);
    setTags(correlationId, partyId, tagRecords, callback);
    recordTags(correlationId, partyId, tags, callback);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - protocol: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> TagsSenecaClientV1 class

TagsSenecaClientV1 is a client that implements Seneca protocol

```javascript
class TagsSenecaClientV1 extends CommandableSenecaClient implements ITagsClientV1 {
    constructor(config?: any);        
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getTags(correlationId, partyId, callback);
    setTags(correlationId, partyId, tagRecords, callback);
    recordTags(correlationId, partyId, tags, callback);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - protocol: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_direct"></a> TagsDirectClientV1 class

TagsDirectClientV1 is a client that calls controller from the same container.
It is intended to be used in monolythic deployments

```javascript
class TagsDirectClientV1 extends DirectClient implements ITagsClientV1 {
    constructor(config?: any);        
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getTags(correlationId, partyId, callback);
    setTags(correlationId, partyId, tagRecords, callback);
    recordTags(correlationId, partyId, tags, callback);
}
```

## <a name="client_null"></a> TagsNullClientV1 class

TagsNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```javascript
class TagsNullClientV1 implements ITagsClientV1 {
    constructor();        
    getTags(correlationId, partyId, callback);
    setTags(correlationId, partyId, tagRecords, callback);
    recordTags(correlationId, partyId, tags, callback);
}
```
