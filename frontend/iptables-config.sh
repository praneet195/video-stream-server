#!/bin/sh
usage ()
{
  echo 'Usage : ./iptables-config.sh -d <lvs-IP>'
  exit
}

case $1 in
        -d)         shift
                    lvsIP=$1
		    sudo apt-get install iptables-persistent
		    sudo iptables -t nat -A PREROUTING -d $lvsIP -j REDIRECT
		    sudo bash -c "iptables-save > /etc/iptables/rules.v4"
                    ;;
	*)          usage
    esac

if [ "$lvsIP" = "" ]
then
    usage
fi



