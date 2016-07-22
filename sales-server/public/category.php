<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/categories', function (Request $request, Response $response) {

  $sql = "";
  $parameters = $request->getQueryParams();

  if (array_key_exists("start", $parameters)){
  $start =(int)$parameters['start'];
  }
  if (array_key_exists("limit", $parameters)){
  $limit =(int)$parameters['limit'];
  }
  $keyword=null;
  if (array_key_exists("q", $parameters)){
    $keyword = $parameters['q'];
  }

  if (!empty($start)&&!empty($limit)){
    $start--;

    $stmt = null;
    if (empty($keyword)){
      $sql = "SELECT id,name FROM Categories LIMIT :start,:limit";
      $stmt = DB::prepare($sql);
      $stmt->bindParam(':start', $start,PDO::PARAM_INT);
      $stmt->bindParam(':limit', $limit,PDO::PARAM_INT);

    }else{
      $keywordLike = "%".$keyword."%";
      $sql = "SELECT id,name FROM Categories WHERE name LIKE :keyword LIMIT :start,:limit";
      $stmt = DB::prepare($sql);
      $stmt->bindParam(':start', $start,PDO::PARAM_INT);
      $stmt->bindParam(':limit', $limit,PDO::PARAM_INT);
      $stmt->bindParam(':keyword', $keywordLike);
    }
    $stmt->execute();

    $sqlCount = null;
    $total = 0;
    if (empty($keyword)){
      $sqlCount =  "SELECT count(id) FROM Categories";
      $stmtCount = DB::prepare($sqlCount);
      $stmtCount->execute();
      $total = $stmtCount->fetchColumn();
    }else{
      $keywordLike = "%".$keyword."%";
      $sqlCount =  "SELECT count(id) FROM Categories WHERE name LIKE :keyword";
      $stmtCount = DB::prepare($sqlCount);
      $stmtCount->bindParam(':keyword', $keywordLike);
      $stmtCount->execute();
      $total = $stmtCount->fetchColumn();
    }

    return  $response->withJson($stmt->fetchAll())->withHeader('Access-Control-Expose-Headers','x-total-count')->withHeader('x-total-count', $total);

  }else{
    $sql = "SELECT id,name FROM Categories";
    $stmt = DB::prepare($sql);
    $stmt->execute();

    return  $response->withJson($stmt->fetchAll());
  }



})->add($auth);

$app->post('/category', function (Request $request, Response $response) {

  try{

    $category = (object)$request->getParsedBody();

    if (!empty($category->id)){
            //update
      $sql = "UPDATE Categories SET name=:name WHERE id=:id";
      $stmt = DB::prepare($sql);
      $stmt->bindParam(':name', $category->name);
      $stmt->bindParam(':id', $category->id,PDO::PARAM_INT);
      $stmt->execute();
      return $response->withJson($category);
    }else{
            //insert
      $sql = "INSERT INTO Categories (name) VALUES (:name)";
      $stmt = DB::prepare($sql);
      $stmt->bindParam(':name', $category->name);
      $stmt->execute();
      $category->id = DB::lastInsertId();
      return $response->withJson($category);
    }

  }
  catch(\Exception $e){
    return $response->withStatus(500)->write($e->getMessage());
  }

})->add($auth);

$app->delete('/category/{id}', function (Request $request, Response $response) {
  try{
    $id = $request->getAttribute('id');
    if (!empty($id)){

      $sql = "DELETE FROM Categories WHERE id=:id";
      $stmt = DB::prepare($sql);
      $stmt->bindParam(':id', $id,PDO::PARAM_INT);
      $stmt->execute();
      return $response;
    }
  }
  catch(\Exception $e){
    return $response->withStatus(500)->write($e->getMessage());
  }

})->add($auth);
