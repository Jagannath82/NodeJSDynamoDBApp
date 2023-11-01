import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { User } from "../model/User";
import { docClient } from './../config/DynamodbConfig';

export const createUser = async (user:User) =>{
    try {
        console.log(user);
        const commandDynamoDB = new PutCommand({
             TableName: "User",
             Item: user
           });
        const responseDynamoDB = await docClient.send(commandDynamoDB);

    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
}

export const getUserById = async (city:any, name:any):Promise<any> =>{
    try {
        const commandDynamoDB = new GetCommand({
             TableName: "User",
             Key: {
                city: city,
                name: name
              }
           });
        const responseDynamoDB = await docClient.send(commandDynamoDB);
        return responseDynamoDB;
    } catch (err) {
        console.log(err);
    }
}