# Video Streaming Server Installation scripts

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. This project is tested on Ubuntu 16.04 machines.

### Prerequisites

Run the following command to install and configure Nginx-rtmp module

```
./Install-nginx-server.sh
```
→  Installs the following tools required to compile nginx and nginx-rtmp : 
     build-essential,libpcre3, libpcre3-dev, libssl-dev, unzip, slapd, ldap-utils, libldap2-dev,
     git, ffmpeg
     
→  Installs php7.0-fpm (fastcgi program manager) which will act as an application server for processing all the php requests sent by nginx.

→  Installs php7.0-ldap that will allow php to communicate with database backend (LDAP server)

→  Add a new user=nginx and usergroup=nginx to the system. 

→  Edits /etc/php/7.0/fpm/pool.d/www.conf file to change 
	 listen.owner to nginx listen.group to nginx
         listen.mode to nginx
	 
→ Add the following line in the /usr/local/nginx/conf/fastcgi_params file 

```
fastcgi_param  SCRIPT_FILENAME    $document_root$fastcgi_script_name;
fastcgi_param  PATH_INFO          $fastcgi_script_name;
```
→  Make a working directory and switch to it.

→  Download and extract Nginx and Nginx-RTMP source.

→  Download nginx-auth-ldap module

→  Compile and install Nginx with Nginx-RTMP and nginx-auth-ldap.

→  Copy the stat.xsl file from nginx-rtmp-module-master folder to html folder in /usr/local/nginx

→  Copy the Nginx init script to /etc/init.d/nginx and set permissions to run nginx automatically on system reboot.

→  Copy the base nginx configuration file to /usr/local/nginx/conf/

→  Copy auth.php script to /usr/local/nginx/html for handling php requests and ldap authentication 

→  Create a directory for hls and dash recordings

### Set iptables

Set the prerouting chain of IPtables to REDIRECT the incoming packets from load balancer (lvs-IP) to the video server itself just as the packets arrive. Since, the lvs-server(director) just forwards the packets to the real video server and the destination IP address is still for the LVS-server.

```
./iptables-config.sh -d <lvs-IP>
```
→  Runs “sudo iptables -t nat -A PREROUTING -d $lvsIP -j REDIRECT”

→  Also saves these rules to /etc/iptables/rules.v4 to automatically load the rules on system reboot.

### Run, stop or restart nginx

```
./start.sh →  Start nginx server
./stop.sh →  Stop nginx server
./restart.sh → Stops and starts the nginx server 
```

#### nginx.conf
Base file for starting up the video server. This file is used at the first installation for the video server subsystem. If there are already real video servers in the subsystem, use the nginx.conf of any of the existing real-video servers as the base file.

Also add appropriate ldap credentials to nginx.conf file in the server block "ldap_server ad_1"

#### nginx.conf.example
Example file for some existing real video server.
Also add appropriate ldap credentials to nginx.conf file in the server block "ldap_server ad_1"


