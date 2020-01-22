<?php
// The code below shows headers about who can read this file and which type of content it will     return.
//In this case, our read.php file can be read by anyone (asterisk * means all) and will return a   data in JSON format.
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
include_once '../config/database.php';
include_once '../objects/news.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$news = new News($db);




// query news
$stmt = $news->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 re
    // news array
    $news_arr=array();
    $news_arr["articles"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $news_item=array(
            "id" => $id,
            "source" => $source,
            "author" => $author,
            "title" => $title,
            "description" => $description,
            "url" => $url,
		    "urlToImage" => $urlToImage,
			"publishedAt" => $publishedAt,
            "content" => $content
        );
 
        array_push($news_arr["articles"], $news_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show products data in json format
    echo json_encode($news_arr);
}
 
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No products found.")
    );
}?>