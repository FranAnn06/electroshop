if (typeof(licode) === 'undefined') {
    var licode = {};
}

/**
 *  онтроллер ("синглтон"), отвечает за отображение прелоадера
 * @type {licode.preloader}
 */
licode.preloader = new (function() {
    /**
     * Ёлемент, отрисовывающий прелоадер
     * @type string
     */
    this.element = '<img src="/bitrix/images/dostavista.business/ajax-loader.gif">';
    
    /**
     * ќтрисовывает прелоадер поверх блочного элемента
     * @param {object} block Ёлемент, дл¤ которого отрисовываетс¤ прелоадер
     * @return {undefined}
     */
    this.on = function(block) {
        var obj = $(block);
        var div = $('<div class="async-preloader"></div>');
        var elementPreload = $(this.element);
        div.append(elementPreload);
        div.css({
            'position' : 'absolute',
            'background-color' : 'rgba(255,255,255,0.8)',
            'z-index' : '10',
            'text-align' : 'center'
        });
        div.width(obj.width());
        div.height(obj.height());
        div.position().left = obj.position().left;
        div.position().top = obj.position().top;
        
        obj.prepend(div);
        elementPreload.css({'margin-top': div.height() / 2 - 25 + 'px'});        
    };
    
    /**
     * ”дал¤ет отрисованный прелоадер в блочном элементе
     * @param {object} block Ёлемент, дл¤ которого покрываетс¤ прелоадер
     * @returns {undefined}
     */
    this.off = function(block) {
        $(block).find('.async-preloader').remove();
    };
});