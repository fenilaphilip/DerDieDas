

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
let now_displayed;
function on_category_clicked(category) {
    $.get("data/" + category + ".json", function (data, status) {
        cat_data = data;
        now_displayed = -1;
        $("#openCategoryName").html(data.article + " " + data.category);
        on_next_button_clicked();
        $("#about").hide();
        $("#how-to-play").hide();
        $("#game-area").show();
        $("#previous-button").hide();

    });

}

function on_next_button_clicked() {
    $("#previous-button").show();
    now_displayed++;
    $("#play-ground").html(cat_data.words[now_displayed].nom);
    if (now_displayed === (cat_data.words.length - 1)) {
        $("#next-button").hide();

    }
}

function on_previous_button_clicked() {
    $("#next-button").show();
    now_displayed--;
    $("#play-ground").html(cat_data.words[now_displayed].nom);
    if (now_displayed === 0) {
        $("#previous-button").hide();
    }
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