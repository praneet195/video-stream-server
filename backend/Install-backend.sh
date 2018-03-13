#!/bin/sh

usage ()
{
  echo 'Usage : ./Install-backend.sh -p <set-password>'
  exit
}

case $1 in
        -p)         shift
                    password=$1
	            wget -qO- https://deb.nodesource.com/setup_8.x | sudo bash -
                    sudo apt-get install -y nodejs
		    sudo apt-get install npm
		    sudo apt-get install tmux
                    sudo cp -r Video-server-backend /usr/local/nginx/html
		    cd /usr/local/nginx/html
		    cd Video-server-backend
		    sudo npm install
		    sudo npm install nginx-conf
		    sudo npm install node-forge
		    sudo node pwd_script.js $password
		    sudo cp rc.local /etc/rc.local
                    sudo chmod +x /etc/rc.local
                    ;;
	*)          usage
    esac

if [ "$password" = "" ]
then
    usage
fi
