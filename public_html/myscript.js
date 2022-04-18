
var category_names;
var categories = {
    "regellos": {
        "article": "",
        "category": "regellos",
        "words": []
    }
};

function shuffel_regellos_cards() {
       
    let words = categories["regellos"].words;
        for (i = words.length - 1; i > 0; i--) {
        let rand = get_random(i);
        t = words[rand];
        words[rand] = words[i];
        words[i] = t;
    }
}

function initialize_categories() {
    $.get("data/categories.json", function (data, status) {
        category_names = data;
        console.log("Got categories : " + category_names);
        for (i = 0; i < data.length; i++) {
            let category_name = category_names[i];
            $.get("data/" + category_name + ".json", function (data, status) {
                categories[category_name] = data;
                for (j = 0; j < data.words.length; j++) {
                    categories.regellos.words.push(data.words[j]);
                }
            });

            add_to_category_menu(category_name);
        }
        add_to_category_menu("regellos");
    });
}

function add_to_category_menu(name) {
    $("#categories-container").append("<li><a "
            + "class=\"dropdown-item\" "
            + "onclick= \"on_category_clicked('" + name + "')\" >"
            + name + "</a></li>");
}

$(document).ready(function () {
    $("#game-area").hide();
    initialize_categories();
    $("#der-button").click(function () {
        article_button_clicked("der");
    });
    $("#die-button").click(function () {
        article_button_clicked("die");
    });
    $("#das-button").click(function () {
        article_button_clicked("das");
    });
    $("#plural-flip").click(function () {
        clicked_to_view_plural();
    });
});

let cat_data;
let now_displayed;
function on_category_clicked(name) {
    now_displayed = -1;
    cat_data = categories[name];
    if (name === "regellos") {
        shuffel_regellos_cards();
    }
    $("#openCategoryName").html(cat_data.article + " " + cat_data.category);
    on_next_button_clicked();
    $("#about").hide();
    $("#contact").hide();
    $("#game-area").show();
    $("#previgatewayous-button").hide();
    $("#plural-panel").hide();
}

function on_next_button_clicked() {
    $("#previous-button").show();
    now_displayed++;
    $("#play-ground").css("color", "black");
    $("#der-button").show();
    $("#die-button").show();
    $("#das-button").show();
    $("#plural-panel").slideUp();
    $("#play-ground").html(cat_data.words[now_displayed].nom);

    if (now_displayed === (cat_data.words.length - 1)) {
        $("#next-button").hide();

    }
}

function on_previous_button_clicked() {
    $("#next-button").show();
    now_displayed--;
    $("#der-button").show();
    $("#die-button").show();
    $("#das-button").show();
    $("#play-ground").css("color", "black");
    $("#plural-panel").slideUp();
    $("#play-ground").html(cat_data.words[now_displayed].nom);

    if (now_displayed === 0) {
        $("#previous-button").hide();
    }
}

function nav_about_clicked() {
    $("#game-area").hide();
    $("#contact").hide();
    $("#selection-category").hide();
    $("#about").show();
}

function nav_contact_clicked() {
    $("#game-area").hide();
    $("#about").hide();
    $("#contact").show();
}


function article_button_clicked(button_clicked) {
    if (cat_data.words[now_displayed].atk === button_clicked) {
        $("#play-ground").html(cat_data.words[now_displayed].atk + " "
                + cat_data.words[now_displayed].nom);

        $("#play-ground").css("color", "green");
        $("#der-button").hide();
        $("#die-button").hide();
        $("#das-button").hide();

    } else {
        $("#play-ground").html(cat_data.words[now_displayed].atk + " "
                + cat_data.words[now_displayed].nom);

        $("#play-ground").css("color", "red");
        $("#der-button").hide();
        $("#die-button").hide();
        $("#das-button").hide();
    }

}

function clicked_to_view_plural() {
    $("#plural-panel").show();
    $("#plural-panel").slideDown("slow");
    $("#plural-panel").html(cat_data.words[now_displayed].plu);
}

function get_random(max) {
    return Math.floor(Math.random() * (max + 1));
}
