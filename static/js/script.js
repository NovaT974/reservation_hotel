$('document').ready(function () {
    // appel de la fonction pour ajout des etoiles automatiquement pour les hotels
    stars();
    var port = 3009;
    //var val1 = $('#id-h').val();
    // var val2 = $('#name-hotel').val();
    // var val3 = $('#img-hotel').val();
    // var val4 = $('#mark-hotel').val();
    // var val5 = $('#secteur-hotel').val();

   // console.log("eee");
    $('#update').click(function () {
        console.log("eee");
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

    $('#reserved').on('click', function (event) {
        event.preventDefault();
        var dateArriver = $('#arrive').val();
        var dateDepart = $('#depart').val();
        var nom = $('#nom').val();
        var hotel = $('#selectHotel').val();
        console.log(hotel);
        var id_hotel = $('#selectHotel').find(':selected').data("id");
        console.log(id_hotel);
        var url = "http://localhost:6002/reserved";

        if(dateArriver && dateDepart && nom && hotel && id_hotel && url !== undefined) {
            $.post(url, {
                    dateArrive: dateArriver,
                    dateDepart: dateDepart,
                    nom: nom,
                    hotel: hotel,
                    id_hotel: id_hotel
                },
                function (data, status) {
                    console.log(status);
                    if (data === "success") {
                        $("#reset").trigger("click");
                        console.log("reussi");
                        $('#status').append('<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                            'Reservation réussi <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span></button></div>'
                        )
                    } else if (status === "error") {
                        $('#status').append('<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
                            'Reservation non réussi <button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span></button></div>'
                        )
                        console.log("error");
                    }

                }
            )

        }else {
            console.log("champs non rempli");
        }
    })
});

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
    })
}