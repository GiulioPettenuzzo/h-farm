<?php
class News{
 
    // database connection and table name
    private $conn;
 
    // object properties
    public $id;
    public $source;
    public $author;
    public $title;
    public $description;
    public $url;
    public $urlToImage;
	public $publishedAt;
    public $content;

 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	// read products
	function read(){
 
    	// select all query
    	$query = "SELECT * FROM news_list";
 
    	// prepare query statement
    	$stmt = $this->conn->prepare($query);
 
    	// execute query
    	$stmt->execute();
 
    	return $stmt;
	}
}
?>