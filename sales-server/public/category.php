<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;



$app->post('/category', function (Request $request, Response $response) {

    try{

        $category = (object)$request->getParsedBody();

        if (!empty($category->id)){
            //update
            $sql = "UPDATE  categories SET name=:name WHERE id=:id";
            $stmt = DB::prepare($sql);
            $stmt->bindParam(':name', $category->name);
            $stmt->bindParam(':id', $category->id,PDO::PARAM_INT);
            $stmt->execute();
            return $response->withJson($category);
        }else{
            //insert
            $sql = "INSERT INTO categories (name) VALUES (:name)";
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
