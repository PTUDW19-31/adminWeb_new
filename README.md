TODO: sql proxy when run on cloud shell (using project db-nmptudw19)
sudo mkdir /cloudsql
sudo chmod 777 /cloudsql
cloud_sql_proxy -dir=/cloudsql &

Run at localhost:
    remove/comment like this: at models/index.js
    // dialectOptions: {
    //     socketPath: process.env.DB_HOST
    // },