require('dotenv/config')

module.exports = {

  database: {
    mysql: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  },
  
  AWS: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    region: process.env.AWS_S3_REGION,
    bucket: process.env.AWS_S3_BUCKET,
  },
  
  port: process.env.PORT,
  jwtSecret: process.env.JWT_KEY

}
