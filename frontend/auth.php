<?php
// www.server.com/auth.php?user=felix&pass=felixpassword

//check if querystrings exist or not
if(empty($_GET['user']) || empty($_GET['pass']))
   {
    //no querystrings or wrong syntax
    echo "wrong query input";
    header('HTTP/1.0 404 Not Found');
    exit(1);
   }

else
   {
    //querystring exist
    $username = $_GET['user'];
    $password = $_GET['pass'];


$ldapconfig['host'] = '10.156.14.20';//CHANGE THIS TO THE CORRECT LDAP SERVER
$ldapconfig['port'] = '389';
$ldapconfig['basedn'] = 'dc=smartcity';//CHANGE THIS TO THE CORRECT BASE DN
$ldapconfig['usersdn'] = 'cn=devices';//CHANGE THIS TO THE CORRECT USER OU/CN
$ds=ldap_connect($ldapconfig['host'], $ldapconfig['port']);
ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ds, LDAP_OPT_REFERRALS, 0);
ldap_set_option($ds, LDAP_OPT_NETWORK_TIMEOUT, 10);
$dn="uid=".$username.",".$ldapconfig['usersdn'].",".$ldapconfig['basedn'];
if(isset($_GET['user'])){
if ($bind=ldap_bind($ds, $dn, $password)) {
 echo("Login correct");//REPLACE THIS WITH THE CORRECT FUNCTION LIKE A REDIRECT;
 http_response_code(200);
 die();
} 
else
      {
	echo "password or username wrong! ";
	//header('HTTP/1.0 404 Not Found'); //kein stream
	http_response_code(402);
	die();
        }
}
}
?>
