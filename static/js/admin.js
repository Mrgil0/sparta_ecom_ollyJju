function modal_open() { 
    $(`.modal`).fadeIn();

    $(document).mouseup(function (e) {
        if($(`.modal`).has(e.target).length === 0) {
            $(`.modal`).hide();
        };
    });
};