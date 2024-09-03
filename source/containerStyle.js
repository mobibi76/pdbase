document.addEventListener("DOMContentLoaded", function() {
    function adjustContainerHeight() {
        var headerHeight = document.querySelector('h1').offsetHeight + document.querySelector('h2').offsetHeight;
        document.querySelector('#container').style.height = `calc(100vh - ${headerHeight}px)`;
    }

    adjustContainerHeight();
    window.addEventListener('resize', adjustContainerHeight);
});