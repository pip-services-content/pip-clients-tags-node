declare module 'pip-clients-tags-node' {
    import { IClient } from 'pip-services-runtime-node';
    import { RestClient } from 'pip-services-runtime-node';
    import { SenecaClient } from 'pip-services-runtime-node';
    import { LambdaClient } from 'pip-services-runtime-node';
    import { AbstractClient } from 'pip-services-runtime-node';
	import { ComponentDescriptor } from 'pip-services-runtime-node';
	import { ComponentFactory } from 'pip-services-runtime-node';

    export class TagsFactory extends ComponentFactory {
        public static Instance: TagsFactory;	
        constructor();	
    }

    module Version1 {
        export interface ITagsClient extends IClient {
            getTags(correlationId: string, partyId: string, callback: any): void;
            setTags(correlationId: string, partyId: string, tagRecords: any[], callback: any): void;
            recordTags(correlationId: string, partyId: string, tags: string[], callback: any): void;
        }

        export class TagsRestClient extends RestClient implements ITagsClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getTags(correlationId: string, partyId: string, callback: any): void;
            setTags(correlationId: string, partyId: string, tagRecords: any[], callback: any): void;
            recordTags(correlationId: string, partyId: string, tags: string[], callback: any): void;
        }

        export class TagsSenecaClient extends SenecaClient implements ITagsClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getTags(correlationId: string, partyId: string, callback: any): void;
            setTags(correlationId: string, partyId: string, tagRecords: any[], callback: any): void;
            recordTags(correlationId: string, partyId: string, tags: string[], callback: any): void;
        }

        export class TagsLambdaClient extends LambdaClient implements ITagsClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getTags(correlationId: string, partyId: string, callback: any): void;
            setTags(correlationId: string, partyId: string, tagRecords: any[], callback: any): void;
            recordTags(correlationId: string, partyId: string, tags: string[], callback: any): void;
        }

        export class TagsNullClient extends AbstractClient implements ITagsClient {
            public static Descriptor: ComponentDescriptor;
            constructor(config?: any);
            getTags(correlationId: string, partyId: string, callback: any): void;
            setTags(correlationId: string, partyId: string, tagRecords: any[], callback: any): void;
            recordTags(correlationId: string, partyId: string, tags: string[], callback: any): void;
        }
    }

}
