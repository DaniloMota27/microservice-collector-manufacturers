import AWS from 'aws-sdk';
import {sqsHelper} from "@/infra/streaming/sqs/helpers/sqs-helper";

jest.mock('aws-sdk', () => {
    const SQSMocked = {
        sendMessage: jest.fn().mockReturnThis(),
        promise: jest.fn()
    };
    return {
        SQS: jest.fn(() => SQSMocked)
    };
});

const sqs = new AWS.SQS({
    region: 'us-east-1'
});

describe.only('Test case for SQS SendMessage', () => {
    beforeEach(() => {
        (sqs.sendMessage().promise as jest.MockedFunction<any>).mockReset();
    });
    it('should return the UserEvent', async () => {
        expect(jest.isMockFunction(sqs.sendMessage)).toBeTruthy();
        expect(jest.isMockFunction(sqs.sendMessage().promise)).toBeTruthy();
        (sqs.sendMessage().promise as jest.MockedFunction<any>).mockResolvedValueOnce('mocked data');
        const actualValue = await sqsHelper.sendMessage('payload_is_valid', 'url_is_valid', );
        expect(actualValue).toEqual('mocked data');
        expect(sqs.sendMessage).toBeCalledWith({ MessageBody: '"payload_is_valid"', QueueUrl: 'url_is_valid' });
        expect(sqs.sendMessage().promise).toBeCalledTimes(1);
    });

    it('should throw an error when send message error', async () => {
        const sendMessageErrorMessage = '[Error:  [Error: network error]]';
        (sqs.sendMessage().promise as jest.MockedFunction<any>).mockRejectedValueOnce(sendMessageErrorMessage);
        //expect(sqsHelper.sendMessage('payload_is_valid', 'url_is_valid', )).rejects.toStrictEqual(new Error(sendMessageErrorMessage));
        expect(sqs.sendMessage).toBeCalledWith({  MessageBody: '"payload_is_valid"', QueueUrl: 'url_is_valid'});
    });
});