const tsfStepEffect = {
    'bounce': { className: 'bounce-effect' },
    'slideRightLeft': { className: 'slide-right-left-effect' },
    'slideLeftRight': { className: 'slide-left-right-effect' },
    'basic': { className: 'default-effect' },
    'flip': { className: 'flip-effect' },
    'transformation': { className: 'transformation-effect' },
    'slideDownUp': { className: 'slide-down-up-effect' },
    'slideUpDown': { className: 'slide-up-down-effect' }
}
const tsfStepStyle = {
    'style1': { className: 'gsi-step-indicator triangle gsi-style-1' },
    'style2': { className: 'gsi-step-indicator triangle gsi-style-2' },
    'style3': { className: 'gsi-step-indicator triangle gsi-style-3' },
    'style4': { className: 'gsi-style-4' },
    'style5': { className: 'gsi-style-5' },
    'style5_circle': { className: ' gsi-style-5 gsi-number-circle' },
    'style6': { className: 'gsi-style-6' },
    'style7_borderTop': { className: 'gsi-style-7 border-top' },
    'style7_borderBottom': { className: 'gsi-style-7 border-bottom' },
    'style7_borderLeft': { className: 'gsi-style-7 border-left' },
    'style7_borderRight': { className: 'gsi-style-7 border-right' },

    'style7_borderTop_circle': { className: 'gsi-style-7 border-top gsi-number-circle' },
    'style7_borderBottom_circle': { className: 'gsi-style-7 border-bottom gsi-number-circle' },
    'style7_borderLeft_circle': { className: 'gsi-style-7 border-left gsi-number-circle' },
    'style7_borderRight_circle': { className: 'gsi-style-7 border-right gsi-number-circle' },

    'style8': { className: 'gsi-style-8' },
    'style8_circle': { className: 'gsi-style-8 gsi-number-circle' },

    'style9': { className: 'gsi-style-9' },
    'style10': { className: 'gsi-style-10' },
    'style11': { className: 'gsi-style-11' },
    'style12': { className: 'gsi-style-12' }
}


const tsfNavPosition = {
    'bottom': { position: 'bottom', stepClass: '', containerClass: 'tsf-bottom-container', navStepClass: 'tsf-bottom-nav-step' },
    'top': { position: 'top', stepClass: '', containerClass: '', navStepClass: '' },
    'right': { position: 'right', stepClass: 'gsi-arrow-left gsi-vertical', containerClass: 'tsf-left-container', navStepClass: 'tsf-right-nav-step' },
    'left': { position: 'left', stepClass: 'gsi-vertical', containerClass: 'tsf-right-container', navStepClass: 'tsf-left-nav-step' }
}

const tsfDisable = {
    'all': { className: 'gsi-step-no-available-all' },
    'after_current': { className: 'gsi-step-no-available-after-current' },
    'before_current': { className: 'gsi-step-no-available-before-current' },
    'none': { className: '.gsi-step-no-available-all,.gsi-step-no-available-after-current,.gsi-step-no-available-before-current' }
}

jQuery.fn.tsfWizard = function (options) {

    var defaults =
    {
        stepStyle: 'style1',       // grumpy step indicator all styles
        stepEffect: 'basic',
        showStepNum: true,
        stepTransition: true,      //true or false
        validation: false,         //true or false
        navPosition: 'top',        //'bottom' or top,right,left
        height: 'auto',            //'auto' or any height (600px,400px etc)
        showButtons: true,
        manySteps: false,
        prevBtn: '<i class="fa fa-chevron-left"></i> PREV',
        nextBtn: 'NEXT <i class="fa fa-chevron-right"></i>',
        finishBtn: 'FINISH',
        disableSteps: 'none',       //all | after_current | before_current | none    
        onSlideChanged: function (e) { },
        onNextClick: function (e) { },
        onPrevClick: function (e) { },
        onPrevClick: function (e) { },
        onFinishClick: function (e) { }
    };

    var settings = $.extend({}, defaults, options);
    var base, $base;
    var _fistVal = false;
    var _isValid = true;

    //get current index 
    this.getCurrentIndex = function () {
        return $base.find('.tsf-nav-step li.current').index();
    };
    /*
      goto any index 
      
    */
    this.goto = function (index) {

        if (this.getCurrentIndex() < index && settings.validation == true) {
            console.error('Validation is true.You can not go to the next step');
            return;
        }
        _wizardBtnClick(index);
        _wizardNavStepClick($base.find('.tsf-nav-step li').eq(index), 'nav-btn');
    };
    this.setDisableSteps = function (value) {
        settings.disableSteps = value;
        console.log(value);
        _disableSteps(value);
        //_wizardNavStepClick($base.find('.tsf-nav-step li').eq(this.getCurrentIndex()), 'nav-btn');
    };

    //goto next step
    this.nextStep = function () {
        _index = this.getCurrentIndex() + 1;
        this.goto(_index);

    };
    //goto previous step
    this.previousStep = function () {
        _index = this.getCurrentIndex() - 1;
        this.goto(_index < 0 ? 0 : _index);
    };

    //validate current step
    this.validate = function () {
        if (settings.validation) {
            _isValid = $base.find('.tsf-content').parsley().validate({ group: 'block-' + this.getCurrentIndex() });
        }
    };
    this.nextButtonLabel = function (text) {
        $base.find('.tsf-controls [data-type="next"]').html(text);
    }
    this.prevButtonLabel = function (text) {
        $base.find('.tsf-controls [data-type="prev"]').html(text);
    }
    this.finishButtonLabel = function (text) {
        $base.find('.tsf-controls [data-type="finish"]').html(text);
    }

    function _disableSteps(disableValue) {
        _stepDisable = tsfDisable[disableValue];

        switch (disableValue) {
            case 'all':
            case 'after_current':
            case 'before_current':
                {
                    $base.find('.tsf-nav-step ul').addClass(_stepDisable.className);
                }
                break;

            case 'none':
                {
                    $base.find('.tsf-nav-step ul').removeClass(_stepDisable.className);
                }
                break;
        }
    }

    function _wizardBtnClick(_index) {

        // clickedItem = $base;

        if (_index == 0) {
            _count = 1;
        } else {
            _count = $base.find('.tsf-nav-step li').length;
        }
        _finish = false;
        _first = false;

        _btnPrev = $base.find('.tsf-controls [data-type="prev"]');
        _btnNext = $base.find('.tsf-controls [data-type="next"]');
        _btnFinish = $base.find('.tsf-controls [data-type="finish"]');

        //for prev
        if (_index == 0) {
            _first = true;
        } else {
            _first = false;
        }

        if (_index == -1) {
            return;
        }
        //for next
        if (_index >= (_count - 1) && _index != 0) {
            _finish = true;
        }
        //for prev
        if (_first) {
            _btnPrev.hide();
        } else {
            _btnPrev.show();
        }

        //for next
        if (_finish) {
            _btnNext.hide();
            _btnFinish.show();
        } else {
            _btnNext.show();
            _btnFinish.hide();
        }
    }

    function _wizardNavStepClick(_element, from) {
        _parent = $base;//.parents('.tsf-wizard');
        _oldIndex = _parent.find('.tsf-nav-step li.current').index();
        _return = false;
        if (settings.disableSteps!=='none') {
           // console.log(_element.index());

           // _return = false;
            switch (settings.disableSteps) {             
                case 'all':
                    { _return = true;}
                    break;
                case 'after_current':
                    {
                        if (_element.index() > _oldIndex) {
                            _return = true;
                        }                        
                    }
                    break;
                case 'before_current':
                    {
                        if (_element.index() < _oldIndex) {
                            _return = true;
                        }
                    }
                    break;
                case 'none':
                    {
                        _return = false;
                    }
                    break;
            }

         
        }

        if (!_fistVal) {
            if (_element.parent().hasClass('gsi-step-no-available') && from == 'nav-step') {
                return false;
            }
            if (_return && from == 'nav-step') {
               return false;
            }
        }
        _fistVal = false;       
    
        _parent.find('.tsf-nav-step li').removeClass('current');
        _element.addClass('current');
        _newIndex = _parent.find('.tsf-nav-step li.current').index();

        _id = _element.data('target');
        _step_effect = _stepEff.className; //_parent.data('step-effect');

        _parent.find('.tsf-content>.tsf-step').removeClass('active').removeClass(_step_effect);
        _parent.find('.tsf-content>.' + _id).addClass('active').addClass(_step_effect);

        _parent.attr('data-step-index', _element.index());
        /*---------------------------------------------*/

        if (settings.manySteps) {




            if (typeof _element.position() != "undefined") {

                if (settings.navPosition == 'top' || settings.navPosition == 'bottom') {
                    _left = Math.round(_element.position().left);

                    _windowWidth = $(window).width();

                    if (_windowWidth > 1000) {
                        _notShownField = _parent.find('.tsf-nav').width() - _parent.find('.tsf-nav-many-steps').width();

                       // console.log('_left : ' + _left);
                       // console.log('_notShownField : ' + _notShownField);

                        if (_notShownField < (_left)) {
                            _left = _notShownField;
                        } else {
                            _left = 0;
                        }
                    } else {
                        _notShown = (_parent.find('.tsf-nav').width() - _parent.find('.tsf-nav-many-steps').width() - _left);

                        if (_notShown < 60) {
                            _left = _parent.find('.tsf-nav-step li:last-child').position().left - _parent.find('.tsf-nav-many-steps').width() + _parent.find('.tsf-nav-step li:last-child').width();
                        } else {
                            _left = (_left - 80);
                        }


                        if (_newIndex == 0) {
                            _left = 0;
                        }
                    }



                    _parent.find('.tsf-nav').css('transform', 'translateX(-' + _left + 'px)');




                } else {
                    _top = Math.round(_element.position().top) + 60;
                    _notShownField = _parent.find('.tsf-nav').height() - _parent.find('.tsf-nav-many-steps').height();
                    _allCount = _parent.find('.tsf-nav li').length;


                    _avgHeight = Math.round(_parent.find('.tsf-nav').height() / _allCount);
                    _shownCount = Math.round(parseInt(settings.height.replace('px', ''), 0) / _avgHeight);

                    _notShownCount = _allCount - _newIndex;



                    if (_oldIndex > _newIndex) {
                        _newIndex = _newIndex - _shownCount + 2;

                        if (_newIndex < 0) {
                            _newIndex = 0;
                        }

                        _top = _parent.find('.tsf-nav li').eq(_newIndex).position().top;
                    } else {
                        if (_notShownCount > _shownCount) {
                            _newIndex = _newIndex - 1;

                            if (_newIndex < 0) {
                                _newIndex = 0;
                            }
                            _top = _parent.find('.tsf-nav li').eq(_newIndex).position().top;
                        }
                        else {
                            _newIndex = _allCount - _shownCount;
                            _top = _parent.find('.tsf-nav li').eq(_newIndex).position().top;
                        }
                    }

                    _parent.find('.tsf-nav').css('transform', 'translateY(-' + _top + 'px)');

                }
            }
        }
        /*----------------------------------------------*/

        _wizardBtnClick(_element.index());
    }

    return this.each(function (i, el) {
        base = el,
        $base = $(el);

        _fistVal = false;
        _isValid = true;

        _navPos = tsfNavPosition[settings.navPosition];
        _stepEff = tsfStepEffect[settings.stepEffect];
        _stepStyle = tsfStepStyle[settings.stepStyle];

        base.init = function () {
            base.setDefaults();
            base.setEvents();
            base.loadScript();


            if (settings.validation && !settings.showButtons) {
                console.error('Validation and showButtons not be true same time.')
            }
        }
        base.setDefaults = function () {

            /*set defaults*/
            $base.attr('data-step-effect', _stepEff.className);
            $base.attr('data-step-index', 0);

            /*set style*/
            $base.find('.tsf-nav-step ul').removeClass();
            $base.find('.tsf-nav-step ul').addClass(_stepStyle.className);

            if (settings.validation === true) {
                $base.find('.tsf-nav-step ul').addClass('gsi-step-no-available');
            }

            if (settings.stepTransition == true) {
                $base.find('.tsf-nav-step ul').addClass('gsi-transition');
            }
            if (settings.manySteps) {
                $base.find('.tsf-nav-step').addClass('tsf-nav-many-steps');
                $base.find('.tsf-nav-step ul').addClass('tsf-nav');

                if (settings.navPosition == 'left' || settings.navPosition == 'right') {
                    $base.find('.tsf-nav-many-steps').css({
                        'height': settings.height
                    });
                }
                else if (settings.navPosition == 'top' || settings.navPosition == 'bottom') {
                    _windowWidth = $(window).width();
                    if (_windowWidth < 768) {
                        $base.find('.tsf-nav').css('width', '100%');
                        $base.find('.tsf-nav-many-steps').css({
                            'height': '286px',
                            'overflow-y': 'scroll'
                        });
                    }
                }
            }



            if (!settings.showStepNum) {
                $base.addClass('not-show-num');
            } else {
                $base.removeClass('not-show-num');
            }

            if (settings.validation) {
                //$base.find('.tsf-step-content').attr('data-parsley-validate', '');

                $base.find('.tsf-step').each(function (index, section) {
                    $(section).find(':input').attr('data-parsley-group', 'block-' + index);
                });
            }


            $base.find('.tsf-nav-step').addClass(_navPos.navStepClass);
            $base.find('.tsf-nav-step ul').addClass(_navPos.stepClass);
            $base.find('.tsf-container').addClass(_navPos.containerClass);

            $base.addClass(_navPos.position);

            $base.find('.tsf-container .tsf-content').css({
                'height': settings.height,
                'overflow-y': 'auto'
            });

            $base.find('.tsf-controls').css({ 'display': (settings.showButtons == true ? 'block' : 'none') });

            _disableSteps(settings.disableSteps);

            $base.find('[data-type="prev"]').html(String(settings.prevBtn));
            $base.find('[data-type="next"]').html(String(settings.nextBtn));
            $base.find('[data-type="finish"]').html(String(settings.finishBtn));

            $base.find('[data-type="next"]').click(function (e) {

                if (settings.validation) {
                    activeIndex = $base.find('.tsf-step.active').index();
                    _isValid = $base.find('.tsf-content').parsley().validate({ group: 'block-' + activeIndex });
                }

                _currIndex = $base.find('.tsf-nav-step li.current').index();//  $base.data('step-index');
                _from = _currIndex;
                _to = _currIndex + 1;
                //next click
                if (options.onNextClick !== undefined) {
                    options.onNextClick(e, _from, _to, _isValid);
                }
            });

            $base.find('[data-type="prev"]').click(function (e) {
                _currIndex = $base.find('.tsf-nav-step li.current').index();;
                _from = _currIndex;
                _to = _currIndex - 1;
                //prev click
                if (options.onPrevClick !== undefined) {
                    options.onPrevClick(e, _from, _to);
                }
            });

            $base.find('[data-type="finish"]').click(function (e) {
                if (settings.validation) {
                    activeIndex = $base.data('step-index');
                    _isValid = $base.find('.tsf-content').parsley().validate({ group: 'block-' + activeIndex });
                }
                //finish click
                if (options.onFinishClick !== undefined) {
                    options.onFinishClick(e, _isValid);
                }
            });
        }
        base.loadScript = function () {

            if (settings.navPosition == 'top' || settings.navPosition == 'bottom') {
                _width = 0;
                $base.find('.tsf-nav li').each(function () {
                    _width += $(this).width();
                });
                $base.find('.tsf-nav').css('width', (_width + 60));
            } else {
                _height = 0;
                $base.find('.tsf-nav li').each(function () {
                    _height += $(this).height();
                });
                $base.find('.tsf-nav').css('height', (_height));
            }



            $base.closest('.tsf-wizard').each(function () {
                _fistVal = true;
                $(this).find('.tsf-nav-step li').eq(0).click();
            });
        }
        base.setEvents = function () {
            $base.find('.tsf-nav-step li').click(function () {
                _element = $(this);
                _wizardNavStepClick(_element, 'nav-step');
            });

            $base.find(".tsf-wizard-btn").not('[data-type="finish"]').click(function () {
                _element = $(this);
                _parent = _element.closest('.tsf-wizard');

                _index = _parent.attr('data-step-index');

                _dataType = _element.attr('data-type');

                if (_dataType == 'next') {
                    _index = parseInt(_index) + 1;
                } else {
                    _index = parseInt(_index) - 1;
                }


                // _isValid = false;

                if (settings.validation && _dataType == 'next') {

                    _content = _parent.find('.tsf-step.active').find('.tsf-step-content');
                    if (_content.length == 0) {
                        _wizardBtnClick(_index);
                        _wizardNavStepClick(_element.closest('.tsf-wizard').find('.tsf-nav-step li').eq(_index), 'nav-btn');
                    }
                    //_content.validate();

                    // activeIndex = $base.find('.tsf-step.active').index();
                    // _isValid = $base.find('.tsf-content').parsley().validate({ group: 'block-' + activeIndex });

                    //// console.log('validate '+$base.find('.tsf-content').parsley().validate({ group: 'block-' + activeIndex }));
                    // console.log('validate ' + _isValid);
                    if (_isValid) {
                        _wizardBtnClick(_index);
                        _wizardNavStepClick(_element.closest('.tsf-wizard').find('.tsf-nav-step li').eq(_index), 'nav-btn');
                    }

                } else {
                    _wizardBtnClick(_index);
                    _wizardNavStepClick(_element.closest('.tsf-wizard').find('.tsf-nav-step li').eq(_index), 'nav-btn');
                }
            });

            $base.find('.tsf-wizard-btn[data-type="finish"]').click(function () {
                _element = $(this);
                _parent = _element.closest('.tsf-wizard');

                //_isValid = false;
                if (settings.validation) {
                    _content = _parent.find('.tsf-step.active').find('.tsf-step-content');
                    // _content.validate();

                    activeIndex = $base.find('.tsf-step.active').index();
                    //_content.on('submit', function () {
                    //    //_isValid = _content.find('input.error').length === 0;                       
                    //    return true;
                    //});
                    //_isValid = $base.find('.tsf-content').parsley().validate({ group: 'block-' + activeIndex });

                    if (_isValid) {
                        //_wizardBtnClick(_index, _element);
                        //_wizardNavStepClick(_element.parents('.tsf-wizard').find('.tsf-nav-step li').eq(_index), 'nav-btn');
                        $base.find('.tsf-content').submit();
                    }



                }
            });



        }

        base.init();
    });

};
