"use strict";

$(document).ready(function () {

    $(".dev-burger").on("click", function () {
        var id = $(this).val();
        $.ajax("/api/burger/" + id, {
            type: "PUT",
            data: id
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
        if (!$("#customer_name").val().trim().match(/^[a-zA-Z0-9 _-]{1,20}$/)) {
            errors = true;
            errorArray.push("Customer Name field was left blank or included special characters!");
            $("#customer_name_error").removeClass("invisible");
        } else {
            $("#customer_name_error").addClass("invisible");
        }
        if (errors === false) {
            var newOrder = {
                pattyId: $("[name='patty']:checked").val(),
                bunId: $("[name='bun']:checked").val(),
                toppingId: $("[name='topping']:checked").val(),
                name: $("#customer_name").val().trim()
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