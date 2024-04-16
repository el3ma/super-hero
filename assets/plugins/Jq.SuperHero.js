jQuery.fn.superHeroData = function(options){
    const element = this;

    $.ajax({
        type: "GET",
        url: "https://superheroapi.com/api.php/10226860054481457/search/" + options.name,
        dataType: "json",
        success: function(opciones){
            console.log(opciones)
        },
    });
    return this;
};