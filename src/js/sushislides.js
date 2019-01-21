(function(document, window){
    let _slides = [],
        _footer = {},
        _currentSlideIndex = 0,
        _timer = null;


    function SushiSlides(){
        var me = this;
        me.init();
    };

    SushiSlides.prototype = {
        init: function(){
            _addEventListeners();
            _loadSlides();
            _loadFooter();
            _fetchSlideFromUrl();
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
        clearTimeout(_timer);
        _timer = setTimeout(function(){
            let currentSlide = _slides[_currentSlideIndex];
            _toggleFooter();
            currentSlide.scrollIntoView({
                'behavior': 'smooth',

            });
        }, 200);
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
        document.addEventListener('keydown', function(e){
            switch(e.key){
                /** Navigation **/
                case 'ArrowLeft':
                case 'ArrowRight':
                case 'Home':
                case 'End':
                    e.preventDefault();
                    e.stopPropagation();
                    _navigate(e.key);
                    break;
                case 'p':
                    e.preventDefault();
                    e.stopPropagation();
                    _changeMode('presentation');
                    break;
                case 's':
                    e.preventDefault();
                    e.stopPropagation();
                    _changeMode('speaker');
                    break;
                    
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
            case "Home":
                _currentSlideIndex = 0;
                break;
            case "End":
                _currentSlideIndex = _slides.length - 1;
                break;
        }

        /* Limit the index to an allowed range */
        _currentSlideIndex = Math.min(_slides.length - 1, Math.max(0, _currentSlideIndex));
        _addHistory();
        _showCurrentSlide();
    }

    function _addHistory()
    {
        history.pushState(null, null, '#' + _currentSlideIndex);
    }

    function _fetchSlideFromUrl()
    {
        hash = window.location.hash.substr(1);
        if (!hash) return;

        _currentSlideIndex = hash;
    }

    function _changeMode(mode){
        console.log('MODE', mode);
    }

    window.SushiSlides = SushiSlides;
})(document, window);