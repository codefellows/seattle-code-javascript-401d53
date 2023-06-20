import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Response } from 'node-fetch'

export const handler = async(event) => {
  let s3Client = new S3Client({region: 'us-west-2'});
  
  let name = event.Records[0].s3.object.key;
  let size = event.Records[0].s3.object.size;
  let type = '.jpg';
  let newImageDetails = { name, size, type };
  console.log('new image details', newImageDetails);
  
  // see docs: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/getobjectcommand.html
  let input = {
    Bucket: 'rkgallaway-images',
    Key: 'images.json',
  }
  
  let imageDetails;
  try {
    let results = await s3Client.send(new GetObjectCommand(input));
    let response = new Response(results.Body) // satisfies the results "promise"
    let retrievedImageDetails = await response.json() // converts response into usable array
    imageDetails = retrievedImageDetails; // at this point we have the array if json exists
  }catch(e){
    console.log('get object error', e);
    imageDetails = [];
  }
  
  imageDetails.push(newImageDetails);
  console.log('our image details array', imageDetails);
  
  let stringifiedDetails = JSON.stringify(imageDetails, undefined, '  ');
  console.log('i am here');
  let putInput = {
    ...input,
    Body: stringifiedDetails,
    ContentType: 'application/json' //For JSON, it's always this
  }
  console.log('put input object', putInput);
  
  try {
      console.log('i am here too');

    await s3Client.send(new PutObjectCommand(putInput));
  } catch(e){
    console.warn('failed to put', e)
  }
  const response = {
      statusCode: 200,
      body: stringifiedDetails,
  };
  return response;
};
