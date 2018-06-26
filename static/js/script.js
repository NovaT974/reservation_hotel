$('document').ready(function () {
    // appel de la fonction pour ajout des etoiles automatiquement pour les hotels
    stars();
    var port = 3009;
 

  //Fonction pour modifier les données dans la database hotels
    $('#update').click(function () {
       
        var val1 = $('#id-h').val();
        var val2 = $('#name-hotel').val();
        var val3 = $('#img-hotel').val();
        var val4 = $('#mark-h').val();
        var val5 = $('#secteur-hotel').val();
        console.log(val1);
        console.log(val2);
        console.log(val3);
        console.log(val4);
        console.log(val5);
        $.ajax({
            url: 'http://localhost:' + port + '/update',
            method: "PUT",
            data: { donnee1: val1, donnee2: val2, donnee3: val3, donnee4: val4, donnee5: val5 },
            success: function (data) {
                
                $('#update_message').html('<div class="alert alert-success" role="alert">Données enregistrées !</div>');

            }
        });
    });
//Fonction pour ajouter un nouvel hôtel dans la database hotels
    $('#ajouter').click(function (event) {  
        var val1 = $('#insert-id-h').val();
        var val2 = $('#insert-name-hotel').val();
        var val3 = $('#insert-img-hotel').val();
        var val4 = $('#insert-mark-h').val();
        var val5 = $('#insert-secteur-hotel').val();   
      
      
        $.ajax({
            url: 'http://localhost:' + port + '/add',
            type: 'POST',
            data: { donnee1:val1, donnee2: val2, donnee3: val3, donnee4: val4, donnee5: val5 },
            success: function (data) {
                console.log(data);
            },
            error: function (e) {
                console.error("erreur :", e);
            }
        });
    });

    /* */
    $('a.delete').click(function (event) {   
        // e.preventDefault;  
        // recuperation de l'_ID via l'attribut data-objid        
        var _id = $(this).data('objid');    
       console.log("id",_id);
        $.ajax({
            url: 'http://localhost:' + port + '/hotels/' + _id,
            type: 'DELETE',
            data: {
                _id: _id
            },
            success: function (data) {
                console.log(data);
            },
            error: function (e) {
                console.error("erreur :", e);
            }
        });
    });

    $('.reserver').on('click', function (event) {
        event.preventDefault();
        var id = $(this).attr("id");
        console.log("bonsoir"+id);
        var dateArriver = $('#arriver_'+id).val();
        console.log(dateArriver);
        var dateDepart = $('#depart_'+id).val();
        console.log(dateDepart);
        var nom = $('#nom_'+id).val();
        console.log(nom);
        var id_hotel = $(this).data("id");
        console.log(id_hotel);
        var url = "http://localhost:" + port + "/reserved";

        if(dateArriver && dateDepart && nom && id_hotel && url !== undefined) {
            $.post(url, {
                    dateArrive: dateArriver,
                    dateDepart: dateDepart,
                    nom: nom,
                    id_hotel: id_hotel
                },
                function (data, status) {
                    console.log(status);
                    if (data === "success") {
                        $("#reset_"+id).trigger("click");
                        console.log("reussi");
                        $('#status_'+id).append('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                            'Votre Reservation du: '+ dateArriver +' au: '+ dateDepart +' a bien été confirmé <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span></button></div>'
                        );
                    } else if (status === "error") {
                        $('#status_'+id).append('<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                            'Erreur lors de la reservation <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span></button></div>'
                        );
                        console.log("error");
                    }
                }
            )
        }
    })
});
// function reserver(id){
//     reservation();
// }

// fonction etoiles pour les hotels
function stars(){
    $(".star").each(function(){
        var stars = $(this).data("etoile");
        let affiche_nbetoile;
        affiche_nbetoile = "";
        //console.log(stars);
        for (let i=0; i<stars; i++){
            //console.log("dans la boucle");
            affiche_nbetoile +="<i class='fas fa-star'></i>";
            $(this).html(affiche_nbetoile);
        }
    });
}