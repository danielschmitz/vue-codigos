<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/suppliers', function (Request $request, Response $response) {

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
      $sql = "SELECT id,name,address FROM Suppliers LIMIT :start,:limit";
      $stmt = DB::prepare($sql);
      $stmt->bindParam(':start', $start,PDO::PARAM_INT);
      $stmt->bindParam(':limit', $limit,PDO::PARAM_INT);

    }else{
      $keywordLike = "%".$keyword."%";
      $sql = "SELECT id,name,address FROM Suppliers WHERE name LIKE :keyword LIMIT :start,:limit";
      $stmt = DB::prepare($sql);
      $stmt->bindParam(':start', $start,PDO::PARAM_INT);
      $stmt->bindParam(':limit', $limit,PDO::PARAM_INT);
      $stmt->bindParam(':keyword', $keywordLike);
    }
    $stmt->execute();

    $sqlCount = null;
    $total = 0;
    if (empty($keyword)){
      $sqlCount =  "SELECT count(id) FROM Suppliers";
      $stmtCount = DB::prepare($sqlCount);
      $stmtCount->execute();
      $total = $stmtCount->fetchColumn();
    }else{
      $keywordLike = "%".$keyword."%";
      $sqlCount =  "SELECT count(id) FROM Suppliers WHERE name LIKE :keyword";
      $stmtCount = DB::prepare($sqlCount);
      $stmtCount->bindParam(':keyword', $keywordLike);
      $stmtCount->execute();
      $total = $stmtCount->fetchColumn();
    }

    return  $response->withJson($stmt->fetchAll())->withHeader('Access-Control-Expose-Headers','x-total-count')->withHeader('x-total-count', $total);

  }else{
    $sql = "SELECT id,name,address FROM Suppliers";
    $stmt = DB::prepare($sql);
    $stmt->execute();

    return  $response->withJson($stmt->fetchAll());
  }



})->add($auth);

$app->post('/supplier', function (Request $request, Response $response) {

  try{

    $supplier = (object)$request->getParsedBody();

    if (!empty($supplier->id)){
            //update
      $sql = "UPDATE Suppliers SET name=:name,address=:address WHERE id=:id";
      $stmt = DB::prepare($sql);
      $stmt->bindParam(':name', $supplier->name);
      $stmt->bindParam(':id', $supplier->id,PDO::PARAM_INT);
      $stmt->bindParam(':address', $supplier->address,PDO::PARAM_LOB);
      $stmt->execute();
      return $response->withJson($supplier);
    }else{
            //insert
      $sql = "INSERT INTO Suppliers (name,address) VALUES (:name,:address)";
      $stmt = DB::prepare($sql);
      $stmt->bindParam(':name', $supplier->name);
      $stmt->bindParam(':address', $supplier->address,PDO::PARAM_LOB);
      $stmt->execute();
      $supplier->id = DB::lastInsertId();
      return $response->withJson($supplier);
    }

  }
  catch(\Exception $e){
    return $response->withStatus(500)->write($e->getMessage());
  }

})->add($auth);

$app->delete('/supplier/{id}', function (Request $request, Response $response) {
  try{
    $id = $request->getAttribute('id');
    if (!empty($id)){

      $sql = "DELETE FROM Suppliers WHERE id=:id";
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
