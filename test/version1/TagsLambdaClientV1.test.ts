import { YamlConfigReader } from 'pip-services-commons-node';
import { TagsClientFixtureV1 } from './TagsClientFixtureV1';
import { TagsLambdaClientV1 } from '../../src/version1/TagsLambdaClientV1';

suite('TagsLambdaClient', ()=> {
    let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: TagsLambdaClientV1;
    let fixture: TagsClientFixtureV1;

    setup((done) => {
        client = new TagsLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new TagsClientFixtureV1(client);

        client.open(null, done);
    });

    teardown((done) => {
        client.close(null, done);
    });

    test('Get and Set Tags', (done) => {
        fixture.testGetAndSetTags(done);
    });

    test('Record Tags', (done) => {
        fixture.testRecordTags(done);
    });
});