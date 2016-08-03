<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/products', function (Request $request, Response $response) {

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
      $sql = "SELECT id,name,idCategory,idSupplier,quantity,minQuantity,price,description,active,code FROM Products LIMIT :start,:limit";
      $stmt = DB::prepare($sql);
      $stmt->bindParam(':start', $start,PDO::PARAM_INT);
      $stmt->bindParam(':limit', $limit,PDO::PARAM_INT);

    }else{
      $keywordLike = "%".$keyword."%";
      $sql = "SELECT id,name,idCategory,idSupplier,quantity,minQuantity,price,description,active,code FROM Products WHERE name LIKE :keyword LIMIT :start,:limit";
      $stmt = DB::prepare($sql);
      $stmt->bindParam(':start', $start,PDO::PARAM_INT);
      $stmt->bindParam(':limit', $limit,PDO::PARAM_INT);
      $stmt->bindParam(':keyword', $keywordLike);
    }
    $stmt->execute();

    $sqlCount = null;
    $total = 0;
    if (empty($keyword)){
      $sqlCount =  "SELECT count(id) FROM Products";
      $stmtCount = DB::prepare($sqlCount);
      $stmtCount->execute();
      $total = $stmtCount->fetchColumn();
    }else{
      $keywordLike = "%".$keyword."%";
      $sqlCount =  "SELECT count(id) FROM Products WHERE name LIKE :keyword";
      $stmtCount = DB::prepare($sqlCount);
      $stmtCount->bindParam(':keyword', $keywordLike);
      $stmtCount->execute();
      $total = $stmtCount->fetchColumn();
    }

    return  $response->withJson($stmt->fetchAll())->withHeader('Access-Control-Expose-Headers','x-total-count')->withHeader('x-total-count', $total);

  }else{
    $sql = "SELECT id,name,idCategory,idSupplier,quantity,minQuantity,price,description,active,code FROM Products";
    $stmt = DB::prepare($sql);
    $stmt->execute();

    return  $response->withJson($stmt->fetchAll());
  }

})->add($auth);

$app->post('/product', function (Request $request, Response $response) {

  try{

    $product = (object)$request->getParsedBody();

    $product->price = DB::decimalToMySql($product->price);

    if (!empty($product->id)){
            //update
      $sql = "UPDATE Products SET name=:name,idCategory=:idCategory,idSupplier=:idSupplier,quantity=:quantity,minQuantity=:minQuantity,price=:price,description=:description,active=:active,code=:code WHERE id=:id";
      $stmt = DB::prepare($sql);
      $stmt->bindParam(':name', $product->name);
      $stmt->bindParam(':idCategory', $product->idCategory,PDO::PARAM_INT);
      $stmt->bindParam(':idSupplier', $product->idSupplier,PDO::PARAM_INT);
      $stmt->bindParam(':quantity', $product->quantity,PDO::PARAM_INT);
      $stmt->bindParam(':minQuantity', $product->miNQuantity,PDO::PARAM_INT);
      $stmt->bindParam(':price', $product->price);
      $stmt->bindParam(':description', $product->description,PDO::PARAM_LOB);
      $stmt->bindParam(':active', $product->active,PDO::PARAM_INT);
      $stmt->bindParam(':code', $product->code);
      $stmt->bindParam(':id', $product->id,PDO::PARAM_INT);
      $stmt->execute();
      return $response->withJson($product);
    }else{
            //insert
      $sql = "INSERT INTO Products (name,idCategory,idSupplier,quantity,minQuantity,price,description,active,code) VALUES (:name,:idCategory,:idSupplier,:quantity,:minQuantity,:price,:description,:active,:code)";
      $stmt = DB::prepare($sql);
      $stmt->bindParam(':name', $product->name);
      $stmt->bindParam(':idCategory', $product->idCategory,PDO::PARAM_INT);
      $stmt->bindParam(':idSupplier', $product->idSupplier,PDO::PARAM_INT);
      $stmt->bindParam(':quantity', $product->quantity,PDO::PARAM_INT);
      $stmt->bindParam(':minQuantity', $product->miNQuantity,PDO::PARAM_INT);
      $stmt->bindParam(':price', $product->price);
      $stmt->bindParam(':description', $product->description,PDO::PARAM_LOB);
      $stmt->bindParam(':active', $product->active,PDO::PARAM_INT);
      $stmt->bindParam(':code', $product->code);

      $stmt->execute();
      $product->id = DB::lastInsertId();
      return $response->withJson($product);
    }

  }
  catch(\Exception $e){
    return $response->withStatus(500)->write($e->getMessage());
  }

})->add($auth);

$app->delete('/product/{id}', function (Request $request, Response $response) {
  try{
    $id = $request->getAttribute('id');
    if (!empty($id)){

      $sql = "DELETE FROM Products WHERE id=:id";
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
