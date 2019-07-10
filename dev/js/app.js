window.addEventListener('load', function() {
    $('body').addClass('loaded');

    window.initApp();
});

window.initApp = function() {
    let mainTemplate = Handlebars.compile($('#mainTemplate').html());

    window.initHeader();
    window.initModalWindow();
    window.initTask();
    window.initTimer();
    window.initSettingsCategories();
    window.initSettingsPomodoros();
    window.initLogin();
    window.initSettings();
    window.initActivePage();

    document.body.innerHTML = '<div id="wrapper"></div>';

    let wrapper = document.getElementById('wrapper');

    EventBus.trigger('renderHeader', wrapper);
    wrapper.innerHTML += mainTemplate();

    let currentHash = location.hash;

    if(currentHash.length === 0 || currentHash === '#' || !LocalStorageData.getFromLS('username')) EventBus.trigger('routeChange', '#login');
    else Router.routing(location.hash.substr(1));
};