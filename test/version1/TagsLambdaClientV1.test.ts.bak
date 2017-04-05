let _ = require('lodash');

import { ComponentSet } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { DynamicMap } from 'pip-services-runtime-node';
import { LifeCycleManager } from 'pip-services-runtime-node';

import { TagsLambdaClient } from '../../src/version1/TagsLambdaClient';
import { TagsClientFixture } from './TagsClientFixture';

let options = new DynamicMap(require('../../../config/config'));
let clientOptions = options.get('clients');
clientOptions = _.isArray(clientOptions) ? clientOptions : [clientOptions];
let lambdaOptions = _.find(clientOptions, (o) => { 
    return (o.type || (o.identity || {}).type) == 'lambda'; 
});

suite('TagsLambdaClient', ()=> {        
    // Skip test if lambda is not configured
    if (lambdaOptions == null) return; 

    let config = ComponentConfig.fromValue(lambdaOptions);
    let client = new TagsLambdaClient();
    client.configure(config);

    let fixture = new TagsClientFixture(client);

    suiteSetup((done) => {
        client.link(new ComponentSet());
        client.open(done);
    });
    
    suiteTeardown((done) => {
        client.close(done);
    });
        
    test('Get and Set Tags', (done) => {
        fixture.testGetAndSetTags(done);
    });

    test('Record Tags', (done) => {
        fixture.testRecordTags(done);
    });
});