

$(document).ready(function () {

    $.get("data/categories.json", function (data, status) {
        console.log(data);
        for (i = 0; i < data.length; i++) {
            console.log(data[i]);
            let category = "<li "
                    + "class=\"pointer\" "
                    + "onclick= \"foropen('" + data[i] + "')\" >"
                    + data[i] + "</li>";
            $("#categories-container").append(category);
        }
    });
});

function foropen(category) {
    $("#play-ground").load("data/" + category + ".json");

}

$("buttonxx").click(function () {

});
