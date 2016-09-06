
### Set up Virtual Machine  

From Powershell  

    Cd-Vagrant
	
Continue   

    mkdir wordpress_tgd7
    cd
    vagrant init Ubuntu/trusty64	
	vagrant up    
    vagrant ssh

### Install Preliminary Software   

    sudo apt-get install git  
    sudo apt-get install tree  
    sudo apt-get install nodejs  

Comment: now working from Digital Ocean blog (install WordPress on Ubuntu 14-04). See:  

https://www.digitalocean.com/community/tutorials/how-to-install-linux-apache-mysql-php-lamp-stack-on-ubuntu-14-04  
   

https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-on-ubuntu-14-04

### Install Apache  
    sudo apt-get install apache2
    sudo apt-get install lynx
### Install MySQL
    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get install mysql-server php5-mysql
	
    >MySql password is My  
	
    sudo mysql_install_db

    > You can start the MySQL daemon with:
    > cd /usr ; /usr/bin/mysqld_safe &
    > You can test the MySQL daemon with mysql-test-run.pl
    > cd /usr/mysql-test ; perl mysql-test-run.pl
	
    sudo mysql_secure_installation
	
    > allow anonymous users
    > disallow root login
    > keep test db
    > reload privilege tables
### Install PHP

    sudo apt-get install php5 libapache2-mod-php5 php5-mcrypt


### Modify Apache config	

    sudo vim /etc/apache2/mods-enabled/dir.conf

Comment: make change to following (put index.php first in list)

    <IfModule mod_dir.c>
        DirectoryIndex index.html index.cgi index.pl index.php index.xhtml index.htm
    </IfModule>

    sudo service apache2 restart
	
### Check if PHP working 

    sudo vim /var/www/html/info.php
    >add the following
	
    <?php
    phpinfo();
    ?>
	
    lynx localhost/info.php
    > all is well

    >PHP logo
    >PHP Version 5.5.9-1ubuntu4.19
	
    sudo rm /var/www/html/info.php

### Install WordPress
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

Made following changes  

    > define('DB_NAME', 'wordpress');

    > /** MySQL database username */
    > define('DB_USER', 'wordpressuser');

    > /** MySQL database password */
    > define('DB_PASSWORD', 'password');

also 
 
    define('WP_DEBUG', false);  
    define('FS_METHOD', 'direct');
Continue ..

    cd /var/www/html
    sudo chown -R vagrant:www-data *
    mkdir /var/www/html/wp-content/uploads
    lynx localhost

### Modify Vagrant file

in Vagrant file made the following changes

    config.vm.network "forwarded_port", guest: 3000, host: 3000, protocol: "tcp",auto_correct: true
    config.vm.network "forwarded_port", guest: 4000, host: 4000, protocol: "tcp",auto_correct: true
    config.vm.network "forwarded_port", guest: 80, host: 8888, protocol: "tcp",auto_correct: true

    config.vm.network "private_network", :type => 'dhcp', :name => 'vboxnet0', :adapter => 2
	
	config.vm.synced_folder "c:/vmshare", "/home/vagrant/shared"
	config.vm.synced_folder "c:/wpshare2", "/home/vagrant/wpshare2"

    config.vm.provider "virtualbox" do |vb|
        vb.customize ["modifyvm", :id, "--clipboard", "bidirectional"]
        vb.customize ["modifyvm", :id, "--draganddrop", "bidirectional"]
    end
	
    http://localhost:8888/
	> All is well 
	
See aslo here:  
https://www.sitepoint.com/how-to-build-a-speedy-wordpress-sandbox-vm/#

### WordPress Admin Details
    dowsite
    tomgdow
    My

### Modify Apache to Allow URL Rewrites  
    sudo vim /etc/apache2/sites-available/000-default.conf
Now looks like the following  

    <VirtualHost *:80>
        
        ServerName localhost

        <Directory /var/www/html/>
            AllowOverride All
        </Directory>

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

    </VirtualHost>  

Continue ...  
	
    touch /var/www/html/.htaccess
    sudo chown :www-data /var/www/html/.htaccess
    chmod 664 /var/www/html/.htaccess
   
Finally, In wordpress, Settings -> Permalink -> Make Desired Change


###  Notes

#### Installation of Theme (Stratus)  

To install plugins, needed to do this, from within /var/www/html
 
    sudo chmod -R 775 wp-content


