"use strict";

$(document).ready(function () {

    $(".dev-burger").on("click", function () {
        var id = $(this).val();
        var devouredState = {
            devoured: 1
        };
        $.ajax("/api/burger/" + id, {
            type: "PUT",
            data: devouredState
        }).then(
            function () {
                location.reload();
            }
        );
    });

    $(".del-burger").on("click", function () {
        var id = $(this).val();
        $.ajax("/api/delete/" + id, {
            type: "DELETE"
        }).then(
            function () {
                location.reload();
            }
        );
    });

    $("#order_burger").on("click", function () {
        // validate the form to make sure all fields were submitted
        event.preventDefault();
        $("#errorModal").modal("hide");
        $("#error_div").empty();
        var errorArray = [];
        var errors = false;
        if ($("[name='patty']:checked").length === 0) {
            errors = true;
            errorArray.push("You must select a patty!");
            $("#patty_error").removeClass("invisible");
        } else {
            $("#patty_error").addClass("invisible");
        }
        if ($("[name='bun']:checked").length === 0) {
            errors = true;
            errorArray.push("You must select a bun!");
            $("#bun_error").removeClass("invisible");
        } else {
            $("#bun_error").addClass("invisible");
        }
        if ($("[name='topping']:checked").length === 0) {
            errors = true;
            errorArray.push("You must select toppings!");
            $("#topping_error").removeClass("invisible");
        } else {
            $("#topping_error").addClass("invisible");
        }
        if (errors === false) {
            var newOrder = {
                patty_id: $("[name='patty']:checked").val(),
                bun_id: $("[name='bun']:checked").val(),
                topping_id: $("[name='topping']:checked").val()
            };
            $("#order_form").trigger("reset");
            $.ajax("/api/burger", {
                type: "POST",
                data: newOrder
            }).then(
                function () {
                    location.reload();
                }
            );
        } else {
            errorArray.forEach(function (err) {
                $("#error_div").append("<p><i class='fas fa-exclamation-circle pr-2'></i>" + err + "</p>");
            });
            $("#errorModal").modal("show");
        }
    });

    $("#hidden_button").on("click", function () {
        var devouredState = {
            devoured: 0
        };
        $.ajax("/api/reset", {
            type: "PUT",
            data: devouredState
        }).then(
            function () {
                location.reload();
            }
        );
    });
});