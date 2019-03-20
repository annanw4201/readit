function postPoints(postId, submitType) {
    const postPointsDOM = submitType === "addPoints" ? $("#" + "addPoints" + postId) : $("#" + "minusPoints" + postId);
    postPointsDOM.one("submit", function () {
        var formData = $(this).serialize();
        $.ajax({
            type: "POST",
            url: "/posts/" + postId,
            data: formData
        }).done(function(data){
            $("#" + "postPoints" + postId).html(`<span class="points-span" id="postPoints${postId}">${data.postPoints} points </span>`);
        }).fail(function() {
            console.error("post points failed");
        });
    });
}