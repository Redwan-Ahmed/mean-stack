# Blog - MEAN Stack
Due to the new updates on AWS my demo no longer runs as it did previously 😞, maybe in the near future I may have time to update my Elastic Beanstalk & S3 buckets. 

## What is this project? 🤔
* This project is a blog page, which displays a feed with all the posts from different users, which can be sorted by pagination. The application has user authentication and authorisation, Bcrypt was used to encrypt user passwords. The application allows users to create/update/delete their posts (CRUD). Each post has a file upload which has a validation class, which only accepts image type files. I created a multer class (server side) which checks the MIME type of a file and only accepts jpg/png/jpeg files. I used Jason Web Token (JWT) for user login sessions, so that they expire after the set time. The project was hosted on AWS, the server side was deployed on Elastic Beanstalk and the front end was deployed on S3.

## What I learnt?  🚀
1. Node - learnt its core functions, I understand how file requests work and I learnt how to connect Node with MongoDB. I used mongoose to create new schemas and collections.
2. Express - learnt how to handle request and routes, I used middleware to check user authorisation and file upload.
3. File validation - When uploading a file I learnt how to check a MIME type of a file, then validate the files by setting file types which are valid, e.g. JPEG.
4. JWT - I was able to learn how to create JWT sessions and set the timer so when the JWT expires the user will automatically be logged out.
5. Bcrypt - encrypt user passwords.
6. AWS (Amazon Web Service) - I learnt how to host/deploy the server side (Elastic Beanstalk) and the front end (S3).

## What technologies I Used? 🖥
1. Angular 7
2. Node
3. MongoDB
4. Express
5. Bcrypt
6. JWT
7. Mongoose
8. AWS
