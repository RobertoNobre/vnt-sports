This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to start:
    
    - git clone https://github.com/RobertoNobre/vnt-sports.git

    # How to start the backEnd:
    
    - cd  /vnt-sports/server-side-node
    - npm install
    * Edit the db_congig object in 
        /server-side-node/create-table.js
        /server-side-node/index.js

        example: 
            var db_config = {  
                host     : 'localhost',  
                user     : 'root',
                password : '',
                database : 'vnt_sports',
                //port     : 3306, 
            };
    
    - node create-table.js

        * Make sure to see the log of the created tables in your terminal!
        
    - node index.js

        * Make sure to see the log 'API working' in your terminal!

    # How to start the frontEnd:

    - cd /vnt-sports/user-side-react
    - yarn install
    - yarn start

    Vualá :D
    