<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app->get('/', function (Request $request, Response $response) {
    $response->getBody()->write("Hello World");
    return $response;
})->add($auth);

/*
$app->get('/users', function (Request $request, Response $response) {

    $stmt =  DB::prepare("SELECT * from Users");
    $stmt->execute();
    return $response->withJson($stmt->fetchAll());

});


$app->get('/databases', function (Request $request, Response $response) {

    $dbs = DB::query( 'SHOW DATABASES' );
    while( ( $db = $dbs->fetchColumn( 0 ) ) !== false )
    {
        $response->getBody()->write($db . ", ");
    }

    return $response;
});
*/
