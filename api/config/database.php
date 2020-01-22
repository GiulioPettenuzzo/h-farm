<?php
class Database{
 
    // specify your own database credentials
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
		$host = '89.46.111.64';
  		$db = 'Sql1206590_5';
  		$user = 'Sql1206590';
  		$pass = 'j8720f7i1k';
		$charset = 'utf8mb4';
		
        $this->conn = null;
 
        $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
  		$opt = [
    		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    		PDO::ATTR_EMULATE_PREPARES => false,
  		];
  		$this->conn = new PDO($dsn, $user, $pass, $opt);
 
        return $this->conn;
    }
}
?>

