
## Tranfser Wordpress site from Digital Ocean to Vagrant/Ubuntu 

**Preliminaries**

The following may be 'gleaned' from WordPress Dashboard, General Settings

**Wordpress on Vagrant**  

    WordPress Address (URL) ->  http://localhost:8888
    Site Address (URL)   ->     http://localhost:8888
	
**Wordpress on Digital Ocean (appvenkat)**  

    WordPress Address (URL)http://venkat.tomgdow.com
    Site Address (URL) http://venkat.tomgdow.com

### Make Backup of Digital Ocean Site
From within www directory  

    zip -r appvenkat.zip appvenkat
    cd appvenkat
    wp db export
    > Success: Exported to 'wordpress.sql'.
Transferred both files to new directory 

### Reference  
See here
https://codex.wordpress.org/Moving_WordPress#Moving_WordPress_to_a_New_Server

### On Digital Ocean 
From within Wordpress Dashboard, 'General' settings

Changed  ->   

    http://venkat.tomgdow.com
to  ->  

    http://localhost:8888

From within the www directory  

    zip -r appvenkat.zip appvenkat
    cd appvenkat
    wp db export
    > Success: Exported to 'wordpress.sql'

### On Vagrant 

    scp -r tomgdow@tomgdow.com:/home/tomgdow/appvenkat.zip /home/vagrant
    scp -r tomgdow@tomgdow.com:/home/tomgdow/wordpress.sql /home/vagrant

    unzip appvenkat.zip
    sudo rsync -avP ~/appvenkat/ /var/www/html/

From within www/html (wp directory) 

    wp db import /home/vagrant/wordpress.sql
    !failure
    mysql -u root -p
    CREATE DATABASE wordpress;
    CREATE USER wordpressuser@localhost IDENTIFIED BY 'password';
    GRANT ALL PRIVILEGES ON wordpress.* TO wordpressuser@localhost;
    FLUSH PRIVILEGES;
    exit
	
    wp db import /home/vagrant/wordpress.sql
    !success!
    Success: Exported to 'wordpress.sql'.

    sudo service apache2 restart
    localhost:8888
All looks perfect on vagrant

### Restore Digital  Ocean Wordpress

Had to resort to  

    -> deleting /html/appvenkat  
    -> unzipping the backup 
    -> copying appvenkat (unzipped) to html/appvenkat  
    -> importing the (backed up) database files

now can login and all is well ...

### Fix Login to wp-admin problem
Despite the above, found that attempts to login to wp-admin caused the
url to 'jump' to venkat.tomgdow.com

This was fixed by importing the databases again using phpmyadmin,
and then by editing the mysql options table to change (two) links
to 'venkat.tomgdow.com' to 'localhost:8888' Seems to have worked perfectly.



