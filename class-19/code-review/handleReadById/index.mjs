import dynamoose from 'dynamoose';

const schema = new dynamoose.Schema({
    "id": String,
    "name": String,
    "phone": String
});

const friends = dynamoose.model('friends', schema);

export const handler = async(event) => {
  // console.log('this is the body', event.body);
  // remember:  event.pathParameters.id
  const response = {statusCode: null, body: null,};
  const id = event?.pathParameters?.id;
  
  try {
    let results = await friends.get(id);
    console.log('results-------', results);
    
    response.body = JSON.stringify(results);
    response.statusCode = 200;
  }catch(e){
    response.body = JSON.stringify(e.message);
    response.statusCode = 500;
  }
  
  return response;
};
