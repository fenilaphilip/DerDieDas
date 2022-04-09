

$(document).ready(function () {
    $("#game-area").hide();
    $.get("data/categories.json", function (data, status) {
        console.log(data);
        for (i = 0; i < data.length; i++) {
            console.log(data[i]);
            let category = "<li "
                    + "class=\"pointer\" "
                    + "onclick= \"on_category_clicked('" + data[i] + "')\" >"
                    + data[i] + "</li>";
            $("#categories-container").append(category);
        }
    });
});

let cat_data;

function on_category_clicked(category) {
    $.get("data/" + category + ".json", function (data, status) {
        cat_data = data;
        $("#openCategoryName").html(data.article + " " + data.category);
        on_next_button_clicked();
        $("#about").hide();
        $("#how-to-play").hide();
        $("#game-area").show();
    });

}

function on_previous_button_clicked() {
    $("#play-ground").html(cat_data.words[0].nom);
}

function on_next_button_clicked() {
    $("#play-ground").html(cat_data.words[1].nom);
}

function nav_about_clicked() {
    $("#game-area").hide();
    $("#how-to-play").hide();
    $("#about").show();
}

function nav_how_to_play_clicked() {
    $("#game-area").hide();
    $("#about").hide();
    $("#how-to-play").show();
}