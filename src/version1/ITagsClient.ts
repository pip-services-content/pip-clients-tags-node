import { IClient } from 'pip-services-runtime-node';

/**
 * Interface for Tags microservice clients version 1
 * 
 * @author Sergey Seroukhov
 * @version 1.0
 * @since 2016-06-22
 */
export interface ITagsClient extends IClient {
    getTags(correlationId: string, partyId: string, callback: any): void;
    setTags(correlationId: string, partyId: string, tagRecords: any[], callback: any): void;
    recordTags(correlationId: string, partyId: string, tags: string[], callback: any): void;
}
