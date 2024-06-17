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
	    global $entityManager;
	    
	    $payload = getJWTToken($request);
	    $login  = $payload->userid;
	    
	    $userRepository = $entityManager->getRepository('user');
	    $user = $userRepository->findOneBy(array('login' => $login));
	    if ($user) {
		$data = array('nom' => $user->getNom(), 'prenom' => $user->getPrenom());
		$response = addHeaders ($response);
		$response = createJwT ($response);
		$response->getBody()->write(json_encode($data));
	    } else {
		$response = $response->withStatus(404);
	    }

	    return addHeaders ($response);
	}

	// APi d'authentification générant un JWT
	function postLogin (Request $request, Response $response, $args) {   
	    
		global $entityManager;
	    $err=false;
	    $body = $request->getParsedBody();
	    $login = $body['login'] ?? "";
	    $pass = $body['password'] ?? "";

	    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$login))   {
		$err = true;
	    }
	    if (!preg_match("/[a-zA-Z0-9]{1,20}/",$pass))  {
		$err=true;
	    }
	    if (!$err) {
		$userRepository = $entityManager->getRepository('Utilisateurs');
		$user = $userRepository->findOneBy(array('login' => $login, 'pass' => $pass));
		if ($user and $login == $user->getLogin() and $pass == $user->getPass()) {
		    $response = addHeaders ($response);
		    $response = createJwT ($response);
		    $data = array('nom' => $user->getNom(), 'prenom' => $user->getPrenom());
		    $response->getBody()->write(json_encode($data));
		} else {          
		    $response = $response->withStatus(403);
		}
	    } else {
		$response = $response->withStatus(500);
	    }

	    return addHeaders ($response);
    }

	// APi d'authentification générant un JWT
	function postSignup (Request $request, Response $response, $args) {
	    global $entityManager;
		$erreur= [];
	    $err=false;
		// Récupération du body de la requête
		$bodyRequest = $request->getBody();
		$body = json_decode($bodyRequest, true);

		// Récupération des données
	    $nom = $body['nom'] ?? "";
	    $prenom = $body['prenom'] ?? "";
		$civilite = $body['civilite'] ?? "";
		$email = $body['email'] ?? "";
		$tel = $body['tel'] ?? "";
		$adresse = $body['adresse'] ?? "";
		$ville = $body['ville'] ?? "";
		$cp = $body['codePostal'] ?? "";
		$pays = $body['pays'] ?? "";
		$login = $body['login'] ?? "";
		$pass = $body['password'] ?? "";
		$pass2 = $body['confirmation'] ?? "";

		// Vérification de la validité des données
		if(!preg_match("/[a-zA-Z0-9]/", $nom))  {
			array_push($erreur, "Nom invalide");
			$err=true;
		}
		if(!preg_match("/[a-zA-Z0-9]/", $prenom))  {
			array_push($erreur, "Prénom invalide");
			$err=true;
		}
		if(!preg_match("/[a-zA-Z0-9]/", $civilite))  {
			array_push($erreur, "Civilité invalide");
			$err=true;
		}
		if(!preg_match("/[a-zA-Z0-9]/", $ville))  {
			array_push($erreur, "Ville invalide");
			$err=true;
		}
		if(!preg_match("/[0-9]{5}/", $cp))  {
			array_push($erreur, "Code postal invalide, il doit contenir 5 chiffres");
			$err=true;
		}
		if(!preg_match("/[a-zA-Z0-9]{1,20}/", $pays))  {
			array_push($erreur, "Pays invalide");
			$err=true;
		}
		if(!preg_match("/[a-zA-Z0-9]{1,20}/", $login))  {
			array_push($erreur, "Login invalide");
			$err=true;
		}
		if($pass != $pass2) {
			array_push($erreur, "Les mots de passe ne correspondent pas");
			$err=true;
		}

	    if (!$err) {
			// Vérification de l'unicité du login
			$existingUser = $entityManager->getRepository(Utilisateurs::class)->findOneBy(['login' => $login]);
			if ($existingUser) {
				$err = true;
				array_push($erreur, "Login déjà utilisé");
				$response = $response->withStatus(409); //Set response status to 409 (Conflict)
				$response->getBody()->write(json_encode($erreur));
			}
			else {
				$hashedPassword = password_hash($pass, PASSWORD_DEFAULT);
				// Création d'un nouvel utilisateur
				$user = new Utilisateurs();
				$user->setNom($nom);
				$user->setPrenom($prenom);
				$user->setCivilite($civilite);
				$user->setEmail($email);
				$user->setTel($tel);
				$user->setAdresse($adresse);
				$user->setVille($ville);
				$user->setCodePostal($cp);
				$user->setPays($pays);
				$user->setLogin($login);
				$user->setPass($pass);
				$entityManager->persist($user);
				$entityManager->flush();
				$response = addHeaders ($response);
				$response = createJwT ($response);
				$data = array('nom' => $user->getNom(), 'prenom' => $user->getPrenom(), 'id' => $user->getId());
				$response->getBody()->write(json_encode($data));
			}
		}
		else {
			$response->getBody()->write(json_encode($erreur));
			$response = $response->withStatus(500);
		}
	    return addHeaders ($response);
	}