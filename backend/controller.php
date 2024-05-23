<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

	function optionsCatalogue (Request $request, Response $response, $args) {
	    
	    // Evite que le front demande une confirmation à chaque modification
	    $response = $response->withHeader("Access-Control-Max-Age", 600);
	    
	    return addHeaders ($response);
	}

	function hello(Request $request, Response $response, $args) {
	    $array = [];
	    $array ["nom"] = $args ['name'];
	    $response->getBody()->write(json_encode ($array));
	    return $response;
	}
	
	function  getSearchCalatogue (Request $request, Response $response, $args) {
		$flux = json_decode(file_get_contents("./assets/mock/products.json"), true);
		$fluxFilter = array_filter($flux, function ($item) use ($args) {
			return strpos(strtolower($item['name']), strtolower($args['filtre'])) !== false;
		  });
		
		  $fluxFilter = array_values($fluxFilter);
		
		  $jsonData = json_encode($fluxFilter);
		  $response = $response->withHeader('Content-Type', 'application/json');
		  $response->getBody()->write($jsonData);
		
		  return addHeaders($response);
	}

	// API Nécessitant un Jwt valide
	function getCatalogue (Request $request, Response $response, $args) {

        $path = "./assets/mock/products.json";

        if (file_exists($path)) {
            $jsonContent = file_get_contents($path);

            $data = json_decode(
            $jsonContent,
            true
        );

        if ($data !== null) {
            $jsonData = json_encode($data);
      
            $response = $response->withHeader('Content-Type', 'application/json');
      
            $response->getBody()->write($jsonData);
      
            return $response;
          }
        }
        return $response->withStatus(500)->getBody()->write("Erreur lors de la récupération du catalogue.");
    }

	function optionsUtilisateur (Request $request, Response $response, $args) {
	    
	    // Evite que le front demande une confirmation à chaque modification
	    $response = $response->withHeader("Access-Control-Max-Age", 600);
	    
	    return addHeaders ($response);
	}

	// API Nécessitant un Jwt valide
	function getUtilisateur (Request $request, Response $response, $args) {
	    
	    $payload = getJWTToken($request);
	    $login  = $payload->userid;
	    
		$flux = '{"nom":"martin","prenom":"louis"}';
	    
	    $response->getBody()->write($flux);
	    
	    return addHeaders ($response);
	}

	// APi d'authentification générant un JWT
	function postLogin (Request $request, Response $response, $args) {   
	    
		$body = $request->getParsedBody();

        if (isset($body['login']) && isset($body['password'])) {
            $username = $body['login'];
            $password = $body['password'];

            if ($username === 'derya' && $password === 'derya') {
                $token = createJWT($response);

                $userData = [
                    'nom' => 'Odede',
                    'prenom' => 'Derya',
                ];
                
                $flux = json_encode($userData);
                $response = createJwt($response, $token);

                $response->getBody()->write($flux);
        
                return addHeaders ($response);
            }
        }   
        $response->getBody()->write(json_encode(['error' => 'Identifiants incorrects']));
        return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
    }