$(document).on('click', '.settings-icon', function () {
    _parent = $('.demo-settings');

    if (_parent.attr('data-open') == 'true') {
        _parent.find('.settings-main').show();
        _parent.find('.btn-setting').hide();
        _parent.find('.btn-remove').show();
        _parent.attr('data-open', 'false');
    } else {
        _parent.find('.settings-main').hide();
        _parent.find('.btn-remove').hide();
        _parent.find('.btn-setting').show();
        _parent.attr('data-open', 'true');
    }
});

$(document).on('change', '#stepEffect', function () {
    //  $('.tsf-step').removeClass($('.tsf-wizard').data('step-effect'));
    _clear();
    pageLoadScript();
});
$(document).on('change', '#stepTransition', function () {
    pageLoadScript();
});
$(document).on('change', '#showButtons', function () {
    pageLoadScript();
});
$(document).on('change', '#showStepNum', function () {
    pageLoadScript();
});

function _clear() {
    for (var sz in tsfStepEffect) {
        var size = tsfStepEffect[sz];
        $('.tsf-step').removeClass(tsfStepEffect[sz].className)
    }
}