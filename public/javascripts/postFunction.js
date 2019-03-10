function addPoints(postId) {
    $("#" + "addPoints" + postId).one("submit", function () {
        var formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/posts/" + postId,
            data: formData
        }).done(function(data){
            console.log("add points done with");
            console.log(data);
            $("#" + "postPoints" + postId).html(`<span class="points-span" id="postPoints${postId}">${data.postPoints} points </span>`);
        }).fail(function() {
            console.log("add points fail");
        });
    });

}

function minusPoints(postId) {
    console.log("minus points to: " + postId);
}