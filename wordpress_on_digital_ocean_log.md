
### Working from here
https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-on-ubuntu-14-04

sudo vim /etc/apache2/mods-enabled/dir.conf
Comment: make change to following (put index.php first in list)

    <IfModule mod_dir.c>
        DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm
    </IfModule>

	
mysql -u root -p
CREATE DATABASE wordpress;
CREATE USER wordpressuser@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON wordpress.* TO wordpressuser@localhost;
FLUSH PRIVILEGES;
exit
cd ~
wget http://wordpress.org/latest.tar.gz
tar xzvf latest.tar.gz
sudo apt-get update
sudo apt-get install php5-gd libssh2-php
cd ~/wordpress
cp wp-config-sample.php wp-config.php
vim wp-config.php
wordpress #db name
wordpressuser
password

define('WP_DEBUG', false);  
define('FS_METHOD', 'direct');

sudo rsyc -avP ~/wordpress/ /var/www/html/appvenkat
cd /var/www/html/appvenkat
sudo chown -R tomgdow:www-data *
mkdir /var/www/html/appvenkat/wp-content/uploads
sudo chown -R :www-data /var/www/html/appvenkat/wp-content/uploads

sudo  chown -R $USER:$USER /var/www/html/appvenkat/
 
 Your PHP installation appears to be missing the 
 MySQL extension which is required by WordPress
 
 see here:
 https://www.digitalocean.com/community/questions/your-php-installation-appears-to-be-missing-the-mysql-extension-which-is-required-by-wordpress
 
 magic_command_that_fixed
 sudo apt-get install  php5-mysqlnd-ms
 
 #go to venkat.tomgdow.com
 tomgdow
 My
 thomasgdowling@gmail.com
 
 
 #need this for to install plugins
 sudo chmod -R 775 wp-content

 #installed status theme
 ##extras
 
 to get duplicator to password
 sudo chmod -R 777 /var/www/html
 
 install wp-cli from here 
 
 http://wp-cli.org/
