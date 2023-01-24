import env from '../config/env'
import {mongoHelper} from "../../infra/db/helpers/mongodb/mongo-helper";
import AWS from "aws-sdk";
import * as dotenv from 'dotenv'
import {sqsHelper} from "../../infra/streaming/sqs/helpers/sqs-helper";
import {Logger} from "tslog";



mongoHelper.connect(env.mongoUrl).then(async () => {

    const logger = new Logger({hideLogPositionForProduction : true})
    dotenv.config({path: 'src/.env'});
    AWS.config.update({
        region: env.sqsRegion,
        credentials: {
            accessKeyId: env.sqsAccessKeyId,
            secretAccessKey: env.sqsSecretKeyId
        },

    });
    logger.info(`Start app - ${ new Date()}`)
    await sqsHelper.consumerConnect()



}).catch()
