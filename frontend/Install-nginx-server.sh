#!/bin/bash
sudo apt-get install build-essential libpcre3 libpcre3-dev libssl-dev unzip
sudo apt-get install slapd ldap-utils libldap2-dev
sudo apt-get install git
sudo apt-get install ffmpeg
sudo apt-get install python-software-properties software-properties-common
sudo LC_ALL=C.UTF-8 add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install php7.0-fpm
sudo apt-get install php7.0-ldap
sudo adduser --system --no-create-home --disabled-login --disabled-password nginx
sudo addgroup --system nginx
sudo adduser nginx nginx
sudo sed -i -e 's/listen.owner = www-data/listen.owner = nginx/' /etc/php/7.0/fpm/pool.d/www.conf 
sudo sed -i -e 's/listen.group = www-data/listen.group = nginx/' /etc/php/7.0/fpm/pool.d/www.conf 
sudo sed -i -e 's/;listen.mode = 0660/listen.mode = 0660/' /etc/php/7.0/fpm/pool.d/www.conf 
sudo sed -i -e "$ a fastcgi_param  SCRIPT_FILENAME    \$document_root\$fastcgi_script_name;" /usr/local/nginx/conf/fastcgi_params
sudo sed -i -e "$ a fastcgi_param  PATH_INFO          \$fastcgi_script_name;" /usr/local/nginx/conf/fastcgi_params
sudo service php7.0-fpm restart
mkdir nginx
cd nginx
wget http://nginx.org/download/nginx-1.12.2.tar.gz
tar -zxvf nginx-1.12.2.tar.gz
wget https://github.com/arut/nginx-rtmp-module/archive/master.zip
unzip master.zip
git clone https://github.com/kvspb/nginx-auth-ldap.git 
cd nginx-1.12.2
./configure --with-http_ssl_module --add-module=../nginx-rtmp-module-master --add-module=../nginx-auth-ldap
make
sudo make install
sudo cp ../nginx-rtmp-module-master/stat.xsl /usr/local/nginx/html
sudo cp ../../nginx-startup-script /etc/init.d/nginx
sudo chmod +x /etc/init.d/nginx
sudo /usr/sbin/update-rc.d -f nginx defaults 
sudo cp ../../nginx.conf /usr/local/nginx/conf/nginx.conf
sudo cp ../../auth.php /usr/local/nginx/html
sudo mkdir /usr/local/nginx/recording
