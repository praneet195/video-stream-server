# Video Streaming Server Backend Installation scripts

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. This project is tested on Ubuntu 16.04 machines.

### Prerequisites

Run the following to install a nodejs backend server that modifies the nginx configuration.

```
./Install-backend.sh -p <set-password>
```
→  Installs nodejs, npm and tmux binaries

→  Install the npm packages along with nginx-conf and node-force

→  Creates an encrypted password file which is used to authenticate all API requests.

### Start or Stop backend

```
./start.sh 
./stop.sh  
```


