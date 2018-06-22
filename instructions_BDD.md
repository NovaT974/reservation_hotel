Qu'est ce qui a été réalisé ?

1 - creation d'une base de données pour le projet dénommée -> reservation.

2 - creation dans la base de données reservations des collections suivantes :

        1 - clients
        
                - schema de données : {"id": 1, "Nom": "Pat", "Prénom": "Mat","Carte de crédit": 0} 
                
        2 - hotels 
        
                - schema de données : "id": 1, "id_secteur": 1, "Nom": "Tata", "img": "nom_img.jpeg", "Nb_etoiles": 1}
                
        3 - secteurs
        
                - schema de données : {"id": 1,"Nom": "Nord"} 
                
        4 - reservations 
        
                - schema de données : {"id_client": 1, "id_hotel": 1, "date_debut ": 0, "date_fin": 0, }

3 - pour chacune des routes créées, creation des fonctions qui permettent de récupérer les données requises via la BDD 

        - fonction get_clients
        
        - fonction get_hotels
        
        - fonction get_secteurs
        

Comment exploiter la base de données via la console ? (seul le responsable de la bdd à vocation à utiliser la console pour gérer la BDD)


1 - accès à la BDD

        a) lancer mongo dans la console 
        
        b) use [suivi du nom de la base de donnée sans les crochets]
        
        c) db.[nom de la collection sans les crochets].find() pour afficher les documents d'une collection 
        


