(function(document, window){
    let _options_defaults = {},
        _options = {},
        _slides = [],
        _footer = {},
        _currentSlideIndex = 0;


    function SushiSlides(options){
        var me = this;
        _options = Object.assign(_options_defaults, options);
        me.init();
    };

    SushiSlides.prototype = {
        init: function(){
            _addEventListeners();
            _loadSlides();
            _loadFooter();
            _showCurrentSlide();
        }
    };

    function _loadSlides() {
        _slides = document.querySelectorAll("section");
    }

    function _loadFooter() {
        _footer = document.querySelector("footer");
    }

    function _showCurrentSlide() {
        let currentSlide = _slides[_currentSlideIndex];
        currentSlide.scrollIntoView();
        _toggleFooter();
    }

    function _toggleFooter(){
        let currentSlide = _slides[_currentSlideIndex];
        let hiddenClass = "hidden";

        if (currentSlide.dataset.hideFooter !== undefined) {
            _footer.classList.add(hiddenClass);
            return;
        }
        _footer.classList.remove(hiddenClass);
    }

    function _addEventListeners() {
        /* KEYS */
        document.addEventListener('keyup', function(e){
            switch(e.key){
                /** Navigation **/
                case 'ArrowLeft':
                case 'ArrowRight':
                    _navigate(e.key);
                    break;
                case 'p':
                    _changeMode('presentation');
                    break;
                case 's':
                    _changeMode('speaker');
            }
        });
    }
    function _navigate(direction){
        switch (direction) {
            case "ArrowLeft":
                _currentSlideIndex--;
                break;
            case "ArrowRight":
                _currentSlideIndex++;
                break;
        }

        /* Limit the index to an allowed range */
        _currentSlideIndex = Math.min(_slides.length - 1, Math.max(0, _currentSlideIndex));
        _showCurrentSlide();
    }
    function _changeMode(mode){
        console.log('MODE', mode);
    }

    window.SushiSlides = SushiSlides;
})(document, window);